module.exports = (sequelize, Sequelize) => {
    const taskModel = sequelize.define('myTaskModel', {
        title: {
            type: Sequelize.STRING,
            allowNull: false
        },
        subTitle: {
            type: Sequelize.STRING,
            allowNull: false
        },
        user_id: {
            id: Sequelize.INTEGER,
            allowNull: false,
        },
        cat_id: {
            id: Sequelize.INTEGER,
            allowNull: false
        }
    })
    return taskModel;
}