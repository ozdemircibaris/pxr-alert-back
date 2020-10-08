let express    = require('express');
let router     = express.Router();
let bodyParser = require('body-parser');

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
    contents: {"tr": "canım anam akşama ne yemek var", "en": "canım anam akşama ne yemek var"},
    ios_sound: "sound.wav",
    android_sound: "sound2",
    android_channel_id: "cfbd3776-692f-46c3-bd72-8474ac8899ae",
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