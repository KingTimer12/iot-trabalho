#include <Arduino.h>
#include <HX711.h>

HX711 scale;

const int LOADCELL_DOUT_PIN = 22;
const int LOADCELL_SCK_PIN = 23;

void setup()
{
  Serial.begin(115200);
  scale.begin(LOADCELL_DOUT_PIN, LOADCELL_SCK_PIN);
  scale.set_scale(448);
  delay(2000);
  scale.tare();
  Serial.println("Balança Zerada");
}

void loop()
{
  auto medida = scale.get_units(5);
  Serial.println(medida, 3);

  scale.power_down();
  delay(1000);
  scale.power_up();
}