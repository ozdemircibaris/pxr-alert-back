let express = require('express');
let router  = express.Router();
let { sequelize } = require('../db');
const checkAuth = require('../middleware/checkauth');

/* GET home page. */
router.get('/', checkAuth, (req, res, next) => {
  res.send('PXR Alert App');
});

module.exports = router;
