#pragma once

#include <WiFi.h>
#include <ArduinoWebsockets.h>
#include <ArduinoJson.h>

#define WIFI_SSID "Wokwi-GUEST"
#define WIFI_PASSWORD ""
#define WIFI_CHANNEL 6
#define HOST "192.168.0.105" // usar o ip da máquina. Use ipconfig para descobrir
#define PORT 80

using namespace websockets;
class Internet
{
private:
    WebsocketsClient client;
    u16_t clientId = 1;
    unsigned long lastTime = 0;
    unsigned long timerDelay = 1000;

    void notify(String &responseJson)
    {
        client.send(responseJson);
    }

    void response(String &response, float &profit, int &currentItems)
    {
        JsonDocument data;
        JsonDocument doc;
        doc["clientId"] = clientId;
        doc["application"] = "hardware-client";
        doc["currentItems"] = currentItems;
        doc["profit"] = profit;
        data["data"] = doc;
        serializeJson(data, response);
    }

    void onEventsCallback(WebsocketsEvent event, String data)
    {
        switch (event)
        {
        case WebsocketsEvent::ConnectionOpened:
            Serial.println("Connection Opened");
            break;
        case WebsocketsEvent::ConnectionClosed:
            Serial.println("Connection Closed");
            break;
        case WebsocketsEvent::GotPing:
            Serial.println("Got a Ping!");
            break;
        case WebsocketsEvent::GotPong:
            Serial.println("Got a Pong!");
            break;
        default:
            break;
        }
    }

public:
    Internet(u16_t clientId) : client(), clientId(clientId) {}

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
        Serial.print("Host: ");
        Serial.println(HOST);

        bool connected = false;
        for (int i = 0; i < 5; i++)
        {
            connected = client.connect(HOST, PORT, "/");
            if (connected)
            {
                Serial.println("WebSocket connected!");
                break;
            }
            Serial.println("Failed to connect, retrying...");
            delay(2000);
        }
        if (!connected)
        {
            Serial.println("Failed to connect after multiple attempts!");
            return;
        }
        client.onEvent([this](WebsocketsEvent event, String data)
                       { this->onEventsCallback(event, data); });
        client.ping();
    }

    void loop(float &profit, int &currentItems)
    {
        if ((millis() - lastTime) > timerDelay)
        {
            String res;
            response(res, profit, currentItems);
            notify(res);
            if (client.available())
                client.poll();
            lastTime = millis();
        }
    }
};
