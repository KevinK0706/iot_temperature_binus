#include "dht_sensor_library.h"
#include "connect_wifi_library.h"
#include "firebase_library.h"
#include "oled_library.h"

#define WIFI_SSID "Home_Kevin"
#define WIFI_PASSWORD "Kevin1234"

#define API_KEY "AIzaSyAJFORM1aM6szKQuy9YXJW5Bgwg5ojklDk"
#define DATABASE_URL "https://iot-binus-kevin-kurniawan-default-rtdb.asia-southeast1.firebasedatabase.app/" 
#define INTERVAL_PUSH_FIREBASE 5000
#define PIN_BUZZER 18

custom_dht_lib dht_lib(19);
custom_firebase_lib firebase_lib;
custom_oled_lib oled_lib;

long previousMillis = 0; 

void setup() 
{
  Serial.begin(19200);
  oled_lib.init_oled();
  oled_lib.show_wifi();
  custom_wifi_lib(WIFI_SSID,WIFI_PASSWORD);
  firebase_lib.connect_fb(API_KEY,DATABASE_URL);
  pinMode(PIN_BUZZER, OUTPUT); 
  delay(3000);
}

void loop() {
  unsigned long currentMillis = millis();
  if(firebase_lib.getStatusFirebase()){
    float cur_suhu = dht_lib.get_temperature();
    float cur_kelembaban = dht_lib.get_humidity();
    FirebaseJson jsonData;
    jsonData.set("suhu",cur_suhu);
    jsonData.set("kelembaban",cur_kelembaban);
    jsonData.set("create_date/.sv", "timestamp");
    if(currentMillis - previousMillis > INTERVAL_PUSH_FIREBASE) {
      previousMillis = currentMillis;  
      if(!firebase_lib.pushFirebase("/data_final",jsonData)){
        Serial.println("Error Sync Data : "+firebase_lib.getReasonError());
      } 
    }
    float bottom_limit_suhu = firebase_lib.getFloatData("/bottom_limit_suhu");
    if(bottom_limit_suhu==-1){
      Serial.println("Error Get Data Bottom Limit : "+firebase_lib.getReasonError());
    }
    float top_limit_suhu = firebase_lib.getFloatData("/top_limit_suhu");
    if(top_limit_suhu==-1){
      Serial.println("Error Get Data Bottom Limit : "+firebase_lib.getReasonError());
    }
    float bottom_limit_humid = firebase_lib.getFloatData("/bottom_limit_humid");
    if(bottom_limit_humid==-1){
      Serial.println("Error Get Data Bottom Limit : "+firebase_lib.getReasonError());
    }
    float top_limit_humid = firebase_lib.getFloatData("/top_limit_humid");
    if(top_limit_humid==-1){
      Serial.println("Error Get Data Bottom Limit : "+firebase_lib.getReasonError());
    }
    oled_lib.show_data(cur_suhu,bottom_limit_suhu,top_limit_suhu,cur_kelembaban,bottom_limit_humid, top_limit_humid);
    if(
      cur_suhu < bottom_limit_suhu || cur_suhu > top_limit_suhu || 
      cur_kelembaban < bottom_limit_humid || cur_kelembaban > top_limit_humid
    ){
      digitalWrite(PIN_BUZZER, HIGH);
    }
    else{
      digitalWrite(PIN_BUZZER, LOW);
    }
  }
  delay(1000);
}
