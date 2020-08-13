const Sequelize = require('sequelize');
const sequelize = new Sequelize("pxr-alert", "root", "1337", {
    host: "localhost",
    dialect: "mysql"
})

const db = {};

db.userModel = sequelize.import(__dirname + '/models/userModel.js');

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;