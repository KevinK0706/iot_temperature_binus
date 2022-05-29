import firebase from 'firebase';

const firebaseConfig = {
    apiKey: "AIzaSyAJFORM1aM6szKQuy9YXJW5Bgwg5ojklDk",
    authDomain: "iot-binus-kevin-kurniawan.firebaseapp.com",
    databaseURL: "https://iot-binus-kevin-kurniawan-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "iot-binus-kevin-kurniawan",
    storageBucket: "iot-binus-kevin-kurniawan.appspot.com",
    messagingSenderId: "250581953166",
    appId: "1:250581953166:web:854d608cc20fc8a1d577df"
};

firebase.initializeApp(firebaseConfig);
var database = firebase.database();
  
export default database;