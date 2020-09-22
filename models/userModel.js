module.exports = (sequelize, Sequelize) => {
    const userModel = sequelize.define('userModel', {
        fullName: {
            type: Sequelize.STRING,
            allowNull: false,
            validate: {
                len: [2, 100]
            }
        },
        email: {
            type: Sequelize.STRING,
            allowNull: false,
            unique: true,
            validate: {
                len: [6, 100]
            }
        },
        password: {
            type: Sequelize.STRING,
            allowNull: false,
            validate: {
                len: [6, 32]
            }
        },
        phoneToken: {
            type: Sequelize.STRING,
            unique: true,
            allowNull: false
        }
    },
    {
        freezeTableName: true,
        timestamps: false
    })
    return userModel;
}