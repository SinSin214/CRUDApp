const { DataTypes } = require("sequelize");

module.exports = function (sequelize) {
    const User = sequelize.define(
        "user",
        {
            UserName: { type: DataTypes.STRING },
            Password: { type: DataTypes.STRING },
            RealPassword: { type: DataTypes.STRING },
            Token: { type: DataTypes.STRING },
            RefreshToken: { type: DataTypes.STRING },
        },
        {
            timestamps: false,
        }
    );

    return User;
};
