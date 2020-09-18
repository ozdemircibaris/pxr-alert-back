module.exports = (sequelize, Sequelize) => {
    const taskCategoriesModel = sequelize.define("taskCategoriesModel", {
        title: {
            type: Sequelize.STRING,
            allowNull: false
        },
        color: {
            type: Sequelize.STRING,
            allowNull: false,
        }
    },
    {
        freezeTableName: true,
        timestamps: false
    })
    return taskCategoriesModel;
}