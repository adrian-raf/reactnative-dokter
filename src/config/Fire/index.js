import firebase from 'firebase';

if (!firebase.apps.length) {
  firebase.initializeApp({
    apiKey: 'AIzaSyDz6RFNZjpI936G3ZNpSyNhdSRy-Qeyz7s',
    authDomain: 'my-doctor-01-91ee4.firebaseapp.com',
    databaseURL: 'https://my-doctor-01-91ee4-default-rtdb.asia-southeast1.firebasedatabase.app',
    projectId: 'my-doctor-01-91ee4',
    storageBucket: 'my-doctor-01-91ee4.appspot.com',
    messagingSenderId: '256771937945',
    appId: '1:256771937945:web:2ce35636bec1884fb7ca08',
  });
} else {
  firebase.app();
}

const Fire = firebase;
export default Fire;
