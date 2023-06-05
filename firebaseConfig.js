import firebase from "firebase/compat/app";

// 사용할 파이어베이스 서비스 주석을 해제합니다
//import "firebase/compat/auth";
import "firebase/compat/database";
//import "firebase/compat/firestore";
//import "firebase/compat/functions";
import "firebase/compat/storage";

// Initialize Firebase
//파이어베이스 사이트에서 봤던 연결정보를 여기에 가져옵니다
const firebaseConfig = {
  apiKey: "AIzaSyAPPEQJgD1KjKe6LDKa-y18XnBWAHVHvbo",
  authDomain: "project-hi-60da4.firebaseapp.com",
  projectId: "project-hi-60da4",
  databaseURL:
    "https://project-hi-60da4-default-rtdb.asia-southeast1.firebasedatabase.app/",
  storageBucket: "project-hi-60da4.appspot.com",
  messagingSenderId: "869830012727",
  appId: "1:869830012727:web:f3a5abe36db52bbfbeb4b2",
  measurementId: "G-CV31PMBV6Z",
};

//사용 방법입니다.
//파이어베이스 연결에 혹시 오류가 있을 경우를 대비한 코드로 알아두면 됩니다.
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export const firebase_db = firebase.database();
