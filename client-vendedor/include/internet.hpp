#pragma once

#include <WiFi.h>
#include <AsyncTCP.h>
#include <ESPAsyncWebServer.h>
#include <ArduinoJson.h>

#define WIFI_SSID "Wokwi-GUEST"
#define WIFI_PASSWORD ""
#define WIFI_CHANNEL 6

class Internet
{
private:
    AsyncWebServer server;
    AsyncWebSocket ws;
    unsigned long lastTime = 0;
    unsigned long timerDelay = 30000;

    void onEvent(AsyncWebSocket *server, AsyncWebSocketClient *client, AwsEventType type, void *arg, uint8_t *data, size_t len)
    {
        switch (type)
        {
        case WS_EVT_CONNECT:
            Serial.printf("WebSocket client #%u conectado com %s\n", client->id(), client->remoteIP().toString().c_str());
            break;
        case WS_EVT_DISCONNECT:
            Serial.printf("WebSocket client #%u desconectado\n", client->id());
            break;
        case WS_EVT_DATA:
        case WS_EVT_PONG:
        case WS_EVT_ERROR:
            break;
        }
    }

    void notify(String &responseJson)
    {
        ws.textAll(responseJson);
    }

    void response(String &response, float &price)
    {
        JsonDocument doc;
        doc["price"] = price;
        serializeJson(doc, response);
    }

public:
    Internet() : server(80), ws("/ws") {}

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
        Serial.println(WiFi.localIP());

        auto lambda = [this](AsyncWebSocket *server, AsyncWebSocketClient *client, AwsEventType type, void *arg, uint8_t *data, size_t len)
        { this->onEvent(server, client, type, arg, data, len); };
        ws.onEvent(lambda);
        server.addHandler(&ws);

        server.begin();
    }

    void loop(float &price)
    {
        if ((millis() - lastTime) > timerDelay)
        {
            String res;
            response(res, price);
            Serial.print(res);
            notify(res);

            lastTime = millis();
        }

        ws.cleanupClients();
    }
};
