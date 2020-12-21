
importScripts('https://www.gstatic.com/firebasejs/8.2.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/8.2.0/firebase-messaging.js');
 
firebase.initializeApp({
    apiKey: "AIzaSyALyo1Ln_7IWbTtXvqp3rgNnXP23Cxi1FE",
    projectId: "snackaway-app",
    messagingSenderId: "621954494917",
    appId: "1:621954494917:web:811ffe3c50f6e739d2dbac",
});
 
 
const messaging = firebase.messaging();