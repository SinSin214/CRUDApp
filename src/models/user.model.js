const { DataTypes } = require("sequelize");

module.exports = function (sequelize) {
    const User = sequelize.define(
        "User",
        {
            UserName: { type: DataTypes.STRING },
            Password: { type: DataTypes.STRING },
            RealPassword: { type: DataTypes.STRING },
            Token: { type: DataTypes.STRING },
            RefreshToken: { type: DataTypes.STRING },
            Deleted: { type: DataTypes.BOOLEAN },
        },
        {
            timestamps: false,
        }
    );

    return User;
};
