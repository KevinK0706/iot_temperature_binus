#include "dht_sensor_library.h"
#include "connect_wifi_library.h"
#include "firebase_library.h"

#define WIFI_SSID "Home_Kevin"
#define WIFI_PASSWORD "Kevin1234"

#define API_KEY "AIzaSyAJFORM1aM6szKQuy9YXJW5Bgwg5ojklDk"
#define DATABASE_URL "https://iot-binus-kevin-kurniawan-default-rtdb.asia-southeast1.firebasedatabase.app/" 

custom_dht_lib dht_lib(19);
custom_firebase_lib firebase_lib;
void setup() 
{
  Serial.begin(9600);
  custom_wifi_lib(WIFI_SSID,WIFI_PASSWORD);
  firebase_lib.connect_fb(API_KEY,DATABASE_URL);
}

void loop() {
  if(firebase_lib.getStatusFirebase()){
    float cur_suhu = dht_lib.get_temperature();
    float cur_kelembaban = dht_lib.get_humidity();
    FirebaseJson jsonData;
    jsonData.set("suhu",cur_suhu);
    jsonData.set("kelembaban",cur_kelembaban);
    jsonData.set("create_date/.sv", "timestamp");
//    if(!firebase_lib.pushFirebase("/data_test",jsonData)){
//      Serial.println("Error Sync Data : "+firebase_lib.getReasonError());
//    }
//    float bottom_limit_suhu = firebase_lib.getFloatData("/bottom_limit_suhu");
//    if(bottom_limit_suhu==-1){
//      Serial.println("Error Get Data Bottom Limit : "+firebase_lib.getReasonError());
//    }
//    float top_limit_suhu = firebase_lib.getFloatData("/top_limit_suhu");
//    if(top_limit_suhu==-1){
//      Serial.println("Error Get Data Bottom Limit : "+firebase_lib.getReasonError());
//    }
  }
  delay(3000);
}
