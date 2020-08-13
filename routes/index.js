var express = require('express');
var router  = express.Router();
let db      = require('../db');

db.sequelize.sync({ force: false}).then((result) => {
  console.log("connected db");
})

/* GET home page. */
router.get('/', (req, res, next) => {
  res.send('PXR Alert App');
});

module.exports = router;
