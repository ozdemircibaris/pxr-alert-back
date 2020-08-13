const path = require('path');
const Sequelize = require('sequelize');
const sequelize = new Sequelize("pxr-alert", "root", "1337", {
    host: "localhost",
    dialect: "mysql"
})

const db = {};
db.userModel = require(path.join(__dirname, '/models/userModel.js'))(sequelize, Sequelize.DataTypes)

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;