module.exports = (sequelize, Sequelize) => {
    const taskModel = sequelize.define('taskModel', {
        cat_id: {
            type : Sequelize.INTEGER,
            allowNull: false
        },
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
        freezeTableName: true,
        timestamps: false
    })
    return taskModel;
}