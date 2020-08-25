module.exports = (sequelize, Sequelize) => {
    const taskCategoriesModel = sequelize.define("taskCategoriesModel", {
        title: {
            title: {
                type: Sequelize.STRING,
                allowNull: false
            },
            color: {
                type: Sequelize.STRING,
                allowNull: false,
            }
        }
    })
    return taskCategoriesModel;
}