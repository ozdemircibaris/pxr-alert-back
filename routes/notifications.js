let express    = require('express');
let router     = express.Router();
let bodyParser = require('body-parser');
let _          = require('underscore');
let db         = require('../db');
let FCM        = require('fcm-node');
let serverKey  = 'AAAAEDKIcO0:APA91bGV0Tt0ap0fWKh2HZ3ISbU_uF0H7ohklNzTyZmUDaLXmGEZBKN9yVhllZyf9eSNI-_mxk3l1w4tNnFezywxecPPOOY9d_QTEIttGG-dO6v4qSs8IInEIhxU8r_weglkx97Bws5-';
let fcm        = new FCM(serverKey);

// let message = {
//     to: `dComJoVLSl-y2LE0gEpveY:APA91bEyY9kftDK9TLkwUQ-T9cGjRRZD96pXhRJaQwdYzX5vY9SmBdFZDq0grusRXBkNzPHU3U6oLIaTz3cpoXMqV7OrTu3phSy9NBIZalIwwn9SWMGBvILWboCFoPpL2LkcO6KNpuCG`, // android
//     // to: `eXQk2WqPHkadjRmzcfbqNV:APA91bEF41mzXyYUIGUNBQ633m0bxxFHfzWxa_2yL5JOHR2dSft1Wx0j5AKrX94VKIwK_0Y4O_zoyTYD1Ic2_LFaT2MG27w5a75IDZ-yqxcOCNdDBa2pLZZbkcL4VYv1_gEervBPxeUu`, // ios
//     notification: {
//         title: `SA`,
//         body: 'NABER  ',
//         sound: "sound2.mp3",
//         show_in_foreground: true,
//         contentAvailable: true,
//     // Required for background/quit data-only messages on Android
//         priority: 'high',
//     },
//     data: {  //you can send only notification or only data(or include both)
//         data: "aa"
//     }
// };
router.use(bodyParser.json())

let sendNotification = (data) => {
    let headers = {
      "Content-Type": "application/json; charset=utf-8",
      "Authorization": "Basic NThlMjkzYzAtODExZi00Yzk4LWI2ZjItMzlmNzRjMTgxMjNj"
    };

    let options = {
      host: "onesignal.com",
      port: 443,
      path: "/api/v1/notifications",
      method: "POST",
      headers: headers
    };

    let https = require('https');
    let req = https.request(options, (res) => {
      res.on('data', (data) => {
        console.log("Response:");
        console.log(JSON.parse(data));
      });
    });
    req.on('error', (e) => {
      console.log("ERROR:");
      console.log(e);
    });
    req.write(JSON.stringify(data));
    req.end();
  };
  let message = {
    app_id: "85709f52-b07d-4e2b-8a75-6703178bb15a",
    contents: {"tr": "selam", "en": "hi"},
    ios_sound: "sound.wav",
    android_sound: "sound2",
    included_segments: ["Active Users"]
};

router.get('/', (req, res, next) => {
  sendNotification(message);
    res.send(
        // fcm.send(message, (err, response) => {
        //     if (err) {
        //     //   console.log("Something has gone wrong!");
        //     } else {
        //     //   console.log("Successfully sent with response: ", response);
        //     }
        //   })
    )
})

module.exports = router;