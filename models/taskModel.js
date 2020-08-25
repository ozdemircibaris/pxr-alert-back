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
            type: Sequelize.DATE,
            allowNull: false
        },
        user_id: {
            type: Sequelize.INTEGER,
            allowNull: false,
        }
    },
    {
        freezeTableName: true

    })
    return taskModel;
}