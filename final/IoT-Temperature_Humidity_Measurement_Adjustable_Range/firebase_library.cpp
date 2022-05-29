#include "firebase_library.h"
#include "addons/TokenHelper.h"
#include "addons/RTDBHelper.h"

custom_firebase_lib::custom_firebase_lib(){
  dataChanged=false;
}

void custom_firebase_lib::connect_fb(char* _api_key, char* _database_url){
    /* Assign the api key (required) */
  config.api_key = _api_key;

  /* Assign the RTDB URL (required) */
  config.database_url = _database_url;

  /* Sign up */
  if (Firebase.signUp(&config, &auth, "", "")){
    Serial.println("Connected To Firebase");
    signupOK = true;
  }
  else{
    Serial.printf("%s\n", config.signer.signupError.message.c_str());
  }

  /* Assign the callback function for the long running token generation task */
  config.token_status_callback = tokenStatusCallback;
  
  Firebase.begin(&config, &auth);
  Firebase.reconnectWiFi(true);
}

bool custom_firebase_lib::getStatusFirebase(){
  return Firebase.ready() && signupOK;
}

bool custom_firebase_lib::pushFirebase(char* path, FirebaseJson firebaseJSON){
  return Firebase.RTDB.pushJSON(&fbdo, path, &firebaseJSON);
}

String custom_firebase_lib::getReasonError(){
  return fbdo.errorReason();
}

float custom_firebase_lib::getFloatData(char* path){
  float result = -1;
  if (Firebase.RTDB.getInt(&fbdo, path)) {
      if (fbdo.dataTypeEnum() == fb_esp_rtdb_data_type_integer){
        result = float(fbdo.to<int>());
      }
  }
  return result;
}
