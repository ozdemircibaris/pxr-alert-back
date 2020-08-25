const Sequelize = require('sequelize');
const sequelize = new Sequelize("pxr-alert", "root", "1337", {
    host: "localhost",
    dialect: "mysql"
})

const user           = require('./models/userModel');
const task           = require('./models/taskModel');
const myTask         = require('./models/myTaskModel');
const taskCategories = require('./models/taskCategoriesModel');

const userModel           = user(sequelize, Sequelize);
const taskModel           = task(sequelize, Sequelize);
const myTaskModel         = myTask(sequelize, Sequelize);
const taskCategoriesModel = taskCategories(sequelize, Sequelize);


module.exports = {
    sequelize,
    userModel,
    taskModel,
    myTaskModel,
    taskCategoriesModel
}