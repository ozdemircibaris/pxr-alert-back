let express = require('express');
let router  = express.Router();
let { sequelize, taskCategoriesModel } = require('../db');
const checkAuth = require('../middleware/checkauth');
const _ = require('underscore');
const bodyParser = require('body-parser');

router.use(bodyParser.json())
/* GET home page. */
router.get('/', checkAuth, (req, res, next) => {
    taskCategoriesModel.findAll().then((result) => {
        if(result) {
            res.json({ status: "success", data: result })
        } else {
            res.json(result)
        }
    })
});

router.post('/', checkAuth, (req, res, next) => {
    let body = _.pick(req.body, "email", "password");

    console.log(body)
    console.log({title, color})
})

module.exports = router;
