let express = require('express');
let router  = express.Router();
let { sequelize } = require('../db');

sequelize.sync({ force: false}).then((result) => {
  console.log("connected db");
})

/* GET home page. */
router.get('/', (req, res, next) => {
  res.send('PXR Alert App');
});

module.exports = router;
