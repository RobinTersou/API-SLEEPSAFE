var admin = require("firebase-admin");

var serviceAccount = require("../fir-storage-sdk.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://sleepsafe-e7889.firebaseio.com"
});

var registrationToken = "fQajDkGPbG8:APA91bEgu_tPAvTCAnrOW6wiWPcIHDtTOguhhlR9NKLqmXmsvTKq-Dxrkr-tWbpCQdNRZYc-CUHB_AhDSzA4owOTVFsDMObZ2Iu1jSFCznU7zNnA7Ee1fgqIzJLTzmXfpf34wIx3bY3x";

var payload = {
  data: {
    MyKey1: "Hello"
  }
};

var options = {
  priority: "high",
  timeToLive: 60*60*24
};

admin.messaging().sendToDevice(registrationToken, payload, options).then(function(response){
  console.log("Sucessfully sent message:", response);
})
.catch(function(error){
  console.log("Error sending message:", error);
});
