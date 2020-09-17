let express = require('express');
let router  = express.Router();
const checkAuth = require('../middleware/checkauth');
let _       = require('underscore');
const { taskModel } = require("../db")

/* GET just selected users data */
router.get('/:id', (req, res) => {
  let id = req.params.id;
  taskModel.findAll({
    where : {
      user_id : id
    }
  }).then((tasks) => {
    res.json({
      status : "Success",
      data : tasks
    })
  })
})

/* POST adding data */
router.post('/', (req, res, next) => {
  let body = _.pick(req.body, "cat_id","title", "subTitle", "jobDate", "user_id");
  taskModel.create(body).then((data) => {
    if(data) res.json({status: "success", data: data.toJSON()});
  }, (e) => {
    return res.status(500).send()
  })
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
        status : "Success"
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
            status : "Success",
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
