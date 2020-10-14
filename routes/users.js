const express    = require('express');
const router     = express.Router();
const bodyParser = require('body-parser');
const _          = require('underscore');
const { userModel } = require('../db');
let random = require('random-key');
const checkAuth = require('../middleware/checkauth');

router.use(bodyParser.json())
/* GET users listing. */
router.get('/', checkAuth, (req, res, next) => {
  userModel.findAll().then((users) => {
    if(users) {
      res.json({ status: "success", data: users })
    } else {
      res.json(users)
    }
  });
});

router.post('/signin', (req, res, next) => {
  const { email, password } = req.body;
  userModel.findOne({
    attributes: ['id', 'fullName', 'email', 'access_token'],
    where: {
      email: email,
      password: password
    }},
    ).then((data) => {
    if(data) {
      res.send({
        status: "success",
        data: data
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
  if(fullName && email && password && phoneToken ) {
    userModel.create({
      fullName,
      email,
      password,
      access_token: random.generate(250),
      phoneToken
    }).then((data) => {
      if(data) res.json({
        status: "success",
        data: {
          id: data.id,
          fullName: data.fullName,
          email: data.email
        }}
      );
    })
  } else {
    return res.status(500).send({ status: "error", message: "Eksik parametre" })
  }
});
module.exports = router;