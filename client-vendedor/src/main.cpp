#include <Arduino.h>
#include <HX711.h>

#include "internet.hpp"

#define PRICE_PER_ITEM 0.65
#define MAX_ITEM 625

// Configuração do HX711
HX711 scale;
Internet internet(1);
const int LOADCELL_DOUT_PIN = 22; // DT
const int LOADCELL_SCK_PIN = 23;  // SCK
const float item_weight = 0.075;  // peso do item em gramas

void setup(void)
{
  Serial.begin(115200);

  internet.init();
  // Configuração do HX711
  scale.begin(LOADCELL_DOUT_PIN, LOADCELL_SCK_PIN);
  scale.set_scale(448);
  scale.tare();

  Serial.print("Cell done.");
}

void loop(void)
{
  float weight = scale.get_units();
  int item_count = weight / item_weight;
  int unitsSold = MAX_ITEM - item_count;
  float profit = unitsSold * 0.65;
  internet.loop(profit, item_count);
}