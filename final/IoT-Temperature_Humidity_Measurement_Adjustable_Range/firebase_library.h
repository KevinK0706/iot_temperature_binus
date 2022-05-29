#ifndef FIREBASE_LIB_H
#define FIREBASE_LIB_H

#include <Arduino.h>
#include <Firebase_ESP_Client.h>

class custom_firebase_lib { 
  volatile bool dataChanged;
  FirebaseData fbdo;
  FirebaseAuth auth;
  FirebaseConfig config; 
  bool signupOK;
  String* childPath;
  public:
    custom_firebase_lib();
    void connect_fb(char*, char*);
    bool getStatusFirebase();
    bool pushFirebase(char*, FirebaseJson); 
    String getReasonError();
    float getFloatData(char*);
};

#endif
