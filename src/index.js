import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/analytics";
import firebaseConfig from "./firebase.config";
import {
  FirestoreProvider,
} from "@react-firebase/firestore";

  console.log('initialize');
  // Initialize Firebase
  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
  } else {
    firebase.app(); // if already initialized, use that one
  }
  firebase.analytics();

ReactDOM.render(
  <FirestoreProvider {...firebaseConfig} firebase={firebase}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </FirestoreProvider>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
