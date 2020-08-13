let express    = require('express');
let router     = express.Router();
let bodyParser = require('body-parser');
let _          = require('underscore');
let db         = require('../db');

router.use(bodyParser.json())

router.get('/', (req, res, next) => {
    res.send("notificationnn")
})

module.exports = router;