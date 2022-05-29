#ifndef DHT_SENSOR_LIB_H
#define DHT_SENSOR_LIB_H

#include <Arduino.h>
#include <DHT.h>

class custom_dht_lib {  
    public:
      DHT dht;
      custom_dht_lib(int);
      float get_temperature();
      float get_humidity();     
};

#endif
