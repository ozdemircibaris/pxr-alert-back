let express = require('express');
let router  = express.Router();
const checkAuth = require('../middleware/checkauth');
let _       = require('underscore');
const { taskModel, taskCategoriesModel, userModel } = require("../db")
let cron       = require('node-cron');
let moment     = require('moment');
let x = null;
console.log("momenttt!!!!!", moment().format('LLLL'))
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

/* GET just selected users data */
router.get('/:id', (req, res) => {
  let id = req.params.id;
  taskModel.findAll({
    where : {
      user_id : id
    },
    include: [
    { model: taskCategoriesModel },
    { model: userModel }
  ]
  }).then((tasks) => {
    res.json({
      status : "success",
      data : tasks
    })
    let dateTest = moment()
    let monthNow = dateTest.month()
    let dayNow = dateTest.day()

    let taskData = tasks.map((item) => item.toJSON())
    taskData.map((task) => {
      let taskSecond  = moment(task.jobDate).second();
      let taskMinutes = moment(task.jobDate).minutes();
      let taskHour    = moment(task.jobDate).hour();
      let taskDay     = moment(task.jobDate).day();
      let taskMonth   = moment(task.jobDate).month();
      let message = {
        app_id: "85709f52-b07d-4e2b-8a75-6703178bb15a",
        contents: {"tr": "canım anam akşama ne yemek var", "en": "English Message"},
        ios_sound: "sound.wav",
        android_sound: "sound2",
        android_channel_id: "cfbd3776-692f-46c3-bd72-8474ac8899ae",
        include_player_ids: [`${task.userModel.phoneToken}`]
      };
      if(monthNow == taskMonth && dayNow == taskDay) {
        cron.schedule(`${taskSecond} ${taskMinutes} ${taskHour} * * *`, () => {
          if(x != "delivered") {
            console.log("run!")
            sendNotification(message);
            x = "delivered";
          }
    }, {
          timezone: 'Europe/Istanbul'
        });
      }
    })
  })
})

/* POST adding data */
router.post('/', (req, res, next) => {
  const { cat_id, title, subTitle, jobDate, user_id } = req.body;
  // console.log({cat_id, title, subTitle, jobDate, user_id});
  if(cat_id && title && subTitle && jobDate && user_id ) {
    let attributes = {};
    attributes = req.body;
    for (let j = 0; j < user_id.length; j++) {
      attributes.user_id = user_id[j];

      if(j == user_id.length -1) {
        taskModel.create(attributes).then((data) => {
          if(data) res.json({ status: "success" });
        })
      } else {
        taskModel.create(attributes)
      }
    }
  } else {
    return res.status(500).send({ status: "error", message: "Eksik parametre" })
  }
})

/* DELETE  Process */
router.delete('/:id',(req,res,next) => {
  let id = req.params.id;
  taskModel.destroy({
    where : {
      id : id
    }
  }).then(rowDeleted => {
    if(rowDeleted === 0){
      res.status(404).send({
        error : "Silmek istediğiniz id bulunamadı!!!"
      })
    } else {
      res.json({
        status : "success"
      });
    }
  }, () => {
    res.status(500).send();
  })
})

/* UPDATE  Process */
router.put('/:id', (req, res) => {
  let id = req.params.id;
  let body = _.pick(req.body, "cat_id","title", "subTitle", "jobDate");
  let attributes = {};

  if(body.hasOwnProperty("cat_id")){
    attributes.cat_id = body.cat_id;
  }
  if(body.hasOwnProperty("title")){
    attributes.title = body.title;
  }
  if(body.hasOwnProperty("subTitle")){
    attributes.subTitle = body.subTitle;
  }
  if(body.hasOwnProperty("jobDate")){
    attributes.jobDate = body.jobDate;
  }

  taskModel.findOne({
    where : {
      id :id
    }
  }).then(data => {
    if(data){
        data.update(attributes).then(data => {
          res.json({
            status : "success",
            data : data.toJSON()
          })
        })
    }else{
        res.json({
          status : "Error",
          error : "Güncellemek istediğiniz id bulunamadı..."
        })
    }
  })

})

module.exports = router;