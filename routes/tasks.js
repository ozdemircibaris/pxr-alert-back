let express = require('express');
let router  = express.Router();
let _       = require('underscore');
var sequelize = require("sequelize");
var db = require("../db");
const { query } = require('express');
const checkAuth = require('../middleware/checkauth');
//const jwt = require('jsonwebtoken');

/* //Get all data
router.get('/', (req, res, next) => {
  taskModel.findAll().then((data) => {
    if(data) {
      res.json({status: "success", data: data})
    } else {
      res.json(data)
    }
  })
});*/
/* GET just selected users data */
router.get('/:id', (req, res) => {
  const id = req.params.id;
  var query_userid = "SELECT * from taskModel INNER JOIN userModel ON userModel.id = taskModel.user_id WHERE user_id = " + id;

  db.sequelize.query(query_userid, { type: db.sequelize.QueryTypes.SELECT }).then((data) => {
    res.json(data);
  })
})

router.post('/', (req, res, next) => {
  let body = _.pick(req.body, "title", "subTitle", "jobDate", "user_id");
  db.taskModel.create(body).then((data) => {
    if(data) res.json({status: "success", data: data.toJSON()});
  }, (e) => {
    return res.status(500).send()
  })
})



router.delete('/:id',(req,res,next) => {
  let taskId = req.params.id;
  db.taskModel.destroy({
    where : {
      id : taskId
    }
  }).then((rowDeleted => {
    if(rowDeleted === 0){
      res.status(404).send({
        error : "Silmek istediğiniz id bulunamadı!!!"
      })
    } else {
      res.status(204).send();
    }
  }, () => {
    res.status(500).send();
  }))
})

module.exports = router;
