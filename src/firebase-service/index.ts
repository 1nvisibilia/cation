import { initializeApp, type FirebaseApp } from 'firebase/app';

const firebaseConfig = {
    apiKey: import.meta.env.VITE_apiKey,
    authDomain: import.meta.env.VITE_authDomain,
    projectId: import.meta.env.VITE_projectId,
    storageBucket: import.meta.env.VITE_storageBucket,
    messagingSenderId: import.meta.env.VITE_messagingSenderId,
    appId: import.meta.env.VITE_appId,
    databaseURL: import.meta.env.VITE_databaseURL
};

const fireBaseApp: FirebaseApp = initializeApp(firebaseConfig);

export default fireBaseApp;
