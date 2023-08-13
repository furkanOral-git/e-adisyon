import firebase from 'firebase/app';
import 'firebase/database';
import ServerManagement from "./server";
import dotenv from 'dotenv'
//firebase
// Import the functions you need from the SDKs you need


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
dotenv.config()

const firebaseConfig = {

    apiKey: process.env.API_KEY,
    authDomain: process.env.AUTH_DOMAIN,
    projectId: process.env.PROJECT_ID,
    storageBucket: process.env.STORAGE_BUCKET,
    messagingSenderId: process.env.MESSAGE_SENDER_ID,
    appId: process.env.APP__ID,
    measurementId: process.env.MEASUREMENT_ID
};

// Initialize Firebase
//const app = firebase.initializeApp(firebaseConfig)
//const database = firebase.database(app)
ServerManagement.buildIoServer(null)



