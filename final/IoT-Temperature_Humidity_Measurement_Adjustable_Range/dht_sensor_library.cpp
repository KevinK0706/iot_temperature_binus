#include "dht_sensor_library.h"

custom_dht_lib::custom_dht_lib(int pin): dht(pin, DHT11){
  dht.begin();
}

float custom_dht_lib::get_temperature()
{
  float tempC = dht.readTemperature();
  if(isnan(tempC)){
    return 0;
  }
  return tempC;
}

float custom_dht_lib::get_humidity()
{
  float humi  = dht.readHumidity();
  if(isnan(humi)){
    return 0;
  }
  return humi;
}
