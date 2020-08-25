module.exports = (sequelize, Sequelize) => {
    const taskModel = sequelize.define('taskModel', {
        title: {
            type: Sequelize.STRING,
            allowNull: false
        },
        subTitle: {
            type: Sequelize.STRING,
            allowNull: false
        },
        jobDate: {
            type: Sequelize.DATETIME,
            allowNull: false
        },
        user_id: {
            id: Sequelize.INTEGER,
            allowNull: false,
        }
    })
    return taskModel;
}