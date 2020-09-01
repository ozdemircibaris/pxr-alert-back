const express    = require('express');
const router     = express.Router();
const bodyParser = require('body-parser');
const _          = require('underscore');
const { userModel } = require('../db');
const jwt = require('jsonwebtoken');

router.use(bodyParser.json())
/* GET users listing. */
router.get('/', (req, res, next) => {
  userModel.findAll().then((users) => {
    if(users) {
      res.json({ status: "success", data: users })
    } else {
      res.json(users)
    }
  });
});

router.post('/signin', (req, res, next) => {
  let body = _.pick(req.body, "email", "password");
  userModel.findOne({
    where: {
      email: body.email,
      password: body.password
    }}).then((data) => {
    if(data) {
      const token = jwt.sign({
        id: data.dataValues,
        email: body.email,
      },
        'secret_key',
      {
        expiresIn :"2h"
      }
    )
      res.send({ 
        status: "success", 
        data: data.dataValues, 
        token: token
      });
    } else {
      res.status(404).send({ 
        status: "error", 
        description: "Email ya da şifre yanlış."
      });
    }
  });
});



router.post('/signup', (req, res, next) => {
  const { fullName, email, password, phoneToken } = req.body
  userModel.create(req.body).then((user) => {
     if(user) res.json({
      status: "success", 
      data: user.toJSON()
    });
  }, (e) => {
    return res.status(500).send()
  });
});

module.exports = router;
