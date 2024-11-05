#include <Arduino.h>
#include <HX711.h>

#include "internet.hpp"

// Configuração do HX711
HX711 scale;
Internet internet;
const int LOADCELL_DOUT_PIN = 22; // DT
const int LOADCELL_SCK_PIN = 23;  // SCK
const float item_weight = 10.0;   // peso do item em gramas

void setup(void)
{
  Serial.begin(115200);

  internet = Internet();
  internet.init();
  // Configuração do HX711
  scale.begin(LOADCELL_DOUT_PIN, LOADCELL_SCK_PIN);
  scale.set_scale(0.9);
  scale.set_unit_price(0.1f);
  scale.tare();

  Serial.print("Cell done.");
}

void loop(void)
{
  float price = scale.get_price();
  internet.loop(price);
}