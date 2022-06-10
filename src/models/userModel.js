const { DataTypes } = require("sequelize");

module.exports = function (sequelize) {
    const User = sequelize.define(
        "user",
        {
            UserName: { type: DataTypes.STRING },
            Password: { type: DataTypes.STRING },
        },
        {
            timestamps: false,
        }
    );

    return User;
};
