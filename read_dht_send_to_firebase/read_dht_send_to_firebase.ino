#include <Arduino.h>
#if defined(ESP32)
  #include <WiFi.h>
#elif defined(ESP8266)
  #include <ESP8266WiFi.h>
#endif

#include <Firebase_ESP_Client.h>
#include "addons/TokenHelper.h"
#include "addons/RTDBHelper.h"
#include <DHT.h>
#include <WiFiUdp.h>

// Insert your network credentials
#define WIFI_SSID ""
#define WIFI_PASSWORD ""

// Insert Firebase project API Key
#define API_KEY "AIzaSyAJFORM1aM6szKQuy9YXJW5Bgwg5ojklDk"

// Insert RTDB URLefine the RTDB URL */
#define DATABASE_URL "https://iot-binus-kevin-kurniawan-default-rtdb.asia-southeast1.firebasedatabase.app/" 

//Define Firebase Data object
FirebaseData fbdo;
FirebaseAuth auth;
FirebaseConfig config;
int count = 0;
bool signupOK = false;

// ESP32 pin GIOP19 connected to DHT11 sensor
#define DHT_SENSOR_PIN  19 
#define DHT_SENSOR_TYPE DHT11
DHT dht_sensor(DHT_SENSOR_PIN, DHT_SENSOR_TYPE);

float readSuhu(){
  float tempC = dht_sensor.readTemperature();
  if(isnan(tempC)){
    return 0;
  }
  return tempC;
}

float readKelembaban(){
  float humi  = dht_sensor.readHumidity();
  if(isnan(humi)){
    return 0;
  }
  return humi;
}

void setup(){
  Serial.begin(115200);
  dht_sensor.begin();
  WiFi.begin(WIFI_SSID, WIFI_PASSWORD);
  Serial.print("Connecting to Wi-Fi");
  while (WiFi.status() != WL_CONNECTED){
    Serial.print(".");
    delay(300);
  }
  Serial.println();
  Serial.print("Connected with IP: ");
  Serial.println(WiFi.localIP());
  Serial.println();

  /* Assign the api key (required) */
  config.api_key = API_KEY;

  /* Assign the RTDB URL (required) */
  config.database_url = DATABASE_URL;

  /* Sign up */
  if (Firebase.signUp(&config, &auth, "", "")){
    Serial.println("ok");
    signupOK = true;
  }
  else{
    Serial.printf("%s\n", config.signer.signupError.message.c_str());
  }

  /* Assign the callback function for the long running token generation task */
  config.token_status_callback = tokenStatusCallback; //see addons/TokenHelper.h
  
  Firebase.begin(&config, &auth);
  Firebase.reconnectWiFi(true);
}

void loop(){
  if (Firebase.ready() && signupOK){
    float cur_suhu = readSuhu();
    float cur_kelembaban = readKelembaban();
    Serial.print("Suhu");
    Serial.println(cur_suhu);
    Serial.print("Humid");
    Serial.println(cur_kelembaban);
    if(cur_suhu >0 && cur_kelembaban >0){
      FirebaseJson jsonSuhu;
      jsonSuhu.set("suhu",cur_suhu);
      jsonSuhu.set("kelembaban",cur_kelembaban);
      jsonSuhu.set("create_date/.sv", "timestamp");
      if (!Firebase.RTDB.pushJSON(&fbdo, "/data_ruangan", &jsonSuhu)) {
        Serial.println("Error Sync Data : "+fbdo.errorReason());
      }
    }
  }
  delay(60000);
}
