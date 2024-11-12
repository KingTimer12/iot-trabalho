#pragma once

#include <WiFi.h>
#include <ArduinoWebsockets.h>
#include <ArduinoJson.h>

#define WIFI_SSID "Wokwi-GUEST"
#define WIFI_PASSWORD ""
#define WIFI_CHANNEL 6
#define HOST "127.0.0.1"
#define PORT 80

using namespace websockets;

class Internet
{
private:
    WebsocketsClient client;
    unsigned long lastTime = 0;
    unsigned long timerDelay = 1000;

    void notify(String &responseJson)
    {
        client.send(responseJson);
    }

    void response(String &response, float &price)
    {
        JsonDocument doc;
        doc["price"] = price;
        serializeJson(doc, response);
    }

    void onMessageCallback(WebsocketsMessage message)
    {
        Serial.print("Got Message: ");
        Serial.println(message.data());
    }

    void onEventsCallback(WebsocketsEvent event, String data)
    {
        if (event == WebsocketsEvent::ConnectionOpened)
        {
            Serial.println("Connnection Opened");
        }
        else if (event == WebsocketsEvent::ConnectionClosed)
        {
            Serial.println("Connnection Closed");
        }
        else if (event == WebsocketsEvent::GotPing)
        {
            Serial.println("Got a Ping!");
        }
        else if (event == WebsocketsEvent::GotPong)
        {
            Serial.println("Got a Pong!");
        }
    }

public:
    Internet() : client() {}

    void init()
    {
        WiFi.mode(WIFI_STA);
        WiFi.begin(WIFI_SSID, WIFI_PASSWORD);
        Serial.print("Connecting to WiFi");
        while (WiFi.status() != WL_CONNECTED)
        {
            Serial.print('.');
            delay(1000);
        }
        Serial.println("Connected");
        Serial.println(WiFi.status());
        Serial.println(WiFi.localIP());
        Serial.print("RRSI: ");
        Serial.println(WiFi.RSSI());
        Serial.println(HOST);

        bool connected = false;
        for (int i = 0; i < 5; i++) // Retry up to 5 times
        {
            connected = client.connect(HOST, PORT, "/");
            if (connected)
            {
                Serial.println("WebSocket connected!");
                break;
            }
            Serial.println("Failed to connect, retrying...");
            delay(2000); // Wait 2 seconds before retrying
        }
        if (!connected)
        {
            Serial.println("Failed to connect after multiple attempts!");
            return;
        }
        client.onMessage([this](WebsocketsMessage message)
                         { this->onMessageCallback(message); });
        client.onEvent([this](WebsocketsEvent event, String data)
                       { this->onEventsCallback(event, data); });
        client.send("Olá, servidor WebSocket!");
        client.ping();
    }

    void loop(float &price)
    {
        if ((millis() - lastTime) > timerDelay)
        {
            String res;
            response(res, price);
            Serial.print(res);
            notify(res);
            if (!client.available())
            {
                Serial.println("WebSocket disconnected, attempting to reconnect...");
                client.close();
                if (client.connect(HOST, PORT, "/"))
                {
                    Serial.println("Reconnected to WebSocket server.");
                    client.send("Olá, servidor WebSocket!");
                }
                else
                {
                    Serial.println("Reconnection failed.");
                }
            }
            else
                client.poll();
            lastTime = millis();
        }
    }
};
