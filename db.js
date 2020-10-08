const Sequelize = require('sequelize');
const sequelize = new Sequelize("pxr-alert", "root", "Ass122...", {
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

taskModel.belongsTo(taskCategoriesModel, { foreignKey: 'cat_id' });
taskModel.belongsTo(userModel, { foreignKey: 'user_id' });
myTaskModel.belongsTo(taskCategoriesModel, { foreignKey: 'cat_id' });

taskCategoriesModel.hasOne(myTaskModel, { foreignKey: 'cat_id' });

// taskCategoriesModel.belongsTo(taskModel, { foreignKey: 'cat_id' });

// dietListModel.belongsTo(dietSubCategoriesModel, { foreignKey: 'sub_cat_id' });

module.exports = {
    sequelize,
    userModel,
    taskModel,
    myTaskModel,
    taskCategoriesModel
}
