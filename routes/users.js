let express    = require('express');
let router     = express.Router();
let bodyParser = require('body-parser');
let _          = require('underscore');
let db         = require('../db');

router.use(bodyParser.json())
/* GET users listing. */
router.get('/', (req, res, next) => {
  db.userModel.findAll().then((users) => {
    if(users) {
      res.json({status: "success", data: users})
    } else {
      res.json(users)
    }
  })
});

router.post('/signin', (req, res, next) => {
  let body = _.pick(req.body, "email", "password");
  db.userModel.findOne({
    where: {
      email: body.email,
      password: body.password
    }
  })
    .then((data) => {
      if(data) {
        res.send({ status: "success", data: data.dataValues })
      } else {
        res.status(404).send({ status: "error", description: "Email ya da şifre yanlış."})
        }
    })
})



router.post('/signup', (req, res, next) => {
  let body = _.pick(req.body, "fullName", "email", "password", "phoneToken");
  db.userModel.create(body).then((user) => {
    if(user) res.json({status: "success", data: user.toJSON()});
  }, (e) => {
    return res.status(500).send()
  })
})

module.exports = router;
