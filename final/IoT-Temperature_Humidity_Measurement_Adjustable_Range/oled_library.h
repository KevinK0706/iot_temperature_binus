#ifndef OLED_LIB_H
#define OLED_LIB_H

#include <Arduino.h>
#include <Adafruit_GFX.h>
#include <Adafruit_SSD1306.h>
#include <Adafruit_Sensor.h>
#include <Wire.h>

class custom_oled_lib { 
  Adafruit_SSD1306 oled;
  public:
    custom_oled_lib();
    void init_oled();
    void show_data(float,float,float, float,float,float);
    void show_wifi();
};

#endif
