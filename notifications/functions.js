const NotificationController = function() { };
const FCM = require('fcm-push');
const serviceAccount = require("./fir-storage-sdk");

NotificationController.send = function (user_token, surname, nb_bed, phone_number) {
  var serverkey = serviceAccount.serveur_key;
  console.log("1111111111111111111111111111111111111111111111111");
  console.log(serverkey);
  var fcm = new FCM(serverkey);
  var registrationToken = user_token;
  console.log("66666666666666666");
  console.log(registrationToken);
  console.log("66666666666666666");
  message = {
    "to" : registrationToken,
    "notification" : {
      "title" : "Demande d'hebergement",
      "body" : "Bonjour " + surname + ", vous avez une demande d'herbergement pour " + nb_bed + " lits",
      //"icon" : "../iconApp.svg",
      "click_action" : "kdshvlshl"
    }
  };
  fcm.send(message, function(err,response){
    if(err) {
      console.log("3333");
      console.log(err);
      console.log("3333");
      return 0;
    } else {
      console.log("2222222222222");
      return 1;
    }
    return 0;
  });
};

NotificationController.send2 = function (user_token, phone_number, address) {
  console.log(user_token);
    var serverkey = serviceAccount.serveur_key;
    var fcm = new FCM(serverkey);
    var registrationToken = user_token;
    message = {
      "to" : registrationToken,
      "notification" : {
        "title" : "Hebergement accepté",
        "body" : "Un hébergeur a accepté votre demande",
        //"icon" : "../iconApp.svg",
        "click_action" : "fzkdhvsvls"
      },
      "data":{
        "phone" : phone_number,
        "address" : address
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
