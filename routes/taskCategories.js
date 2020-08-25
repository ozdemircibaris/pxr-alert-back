const express = require('express');
const router  = express.Router();
const { taskCategoriesModel } = require('../db');
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
    const { title, color } = req.body;
    taskCategoriesModel.create(req.body).then((cat) => {
        if(cat) res.json({status: "success", data: cat.toJSON()});
    }, (e) => {
        return res.status(500).send()
    })
})

module.exports = router;
