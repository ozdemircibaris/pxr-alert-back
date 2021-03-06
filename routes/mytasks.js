const express = require("express");
const router = express.Router();
const checkAuth = require("../middleware/checkauth");
const { myTaskModel, taskCategoriesModel } = require("../db");

router.post("/add", (req, res) => {
    const { title, subTitle, user_id, cat_id } = req.body;

    if ( title != null && subTitle != null && user_id != null && cat_id != null ) {
        myTaskModel.create(req.body).then(myTask => {
            taskCategoriesModel.findOne({
                where: {
                    id: cat_id,
                }
            }).then(taskCategories => {
                if ( taskCategories ) {
                    myTask.dataValues.taskCategories = taskCategories;

                    res.json({
                        status: "success",
                        data: myTask
                    });
                } else {
                    res.status(404).json({
                        status: "error",
                        message: "no taskCategory found"
                    })
                }
            })
        }, (e) => {
            res.status(500).json({
                status: "error"
            });
        });
    } else {
        res.json({
            status: "error",
            message: "missing parameter or parameters"
        });
    }
});

router.get("/:user_id", checkAuth, (req, res) => {
    myTaskModel.findAll({
        where: {
            user_id: req.params.user_id
        },
        include: [{ model: taskCategoriesModel }]
    }).then(myTasks => {
        if ( myTasks ) {
            res.status(200).json({
                status: "success",
                data: myTasks
            });
        } else {
            res.status(404).json({
                status: "error",
                message: "no myTasks found"
            });
        }
    });
});

router.get("/:user_id/category/:cat_id", checkAuth, (req, res) => {
    myTaskModel.findAll({
        where: {
            user_id: req.params.user_id,
            cat_id: req.params.cat_id
        },
        include: [{
            model: taskCategoriesModel,
            where: {
                id: req.params.cat_id
            }
        }]  
    }).then(myTasksCategory => {
        if ( myTasksCategory ) {
            res.status(200).json({
                status: "success",
                data: myTasksCategory
            });
        } else {
            res.status(404).json({
                status: "error",
                message: "no myTasksCategory found"
            });
        }
    });
});


router.delete("/delete/:id", checkAuth, (req, res) => {
    myTaskModel.destroy({
        where: {
            id: req.params.id
        }
    }).then(rowDeleted => {
        if ( rowDeleted == 1 ) {
            res.status(204).json({
                status: "success"
            });
        } else {
            res.json({
                status: "error",
                message: "myTasks not found"
            })
        }
    }, () => {
        res.status(500).json({
            status: "error"
        });
    });
});

module.exports = router;
