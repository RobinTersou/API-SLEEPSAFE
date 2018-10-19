const NotificationController = function() { };
const FCM = require('fcm-push');
const serviceAccount = require("./fir-storage-sdk");

NotificationController.send = function (user_token, surname, nb_bed) {
  console.log("######################");
  console.log(user_token)
  console.log("######################");
  var serverkey = serviceAccount.serveur_key;
  var fcm = new FCM(serverkey);
  var registrationToken = user_token;message = {
    "to" : registrationToken,
    "notification" : {
      "title" : "Demande d'hebergement",
      "body" : "Bonjour " + surname + ", vous avez une demande d'herbergement pour " + nb_bed + " lits",
      "icon" : "../iconApp.svg",
      "click_action" : "kdshvlshl"
    }
  };
  fcm.send(message, function(err,response){
    if(err) {
      return 0;
    } else {
      return 1;
    }
    return 0;
  });
};
module.exports = NotificationController;
