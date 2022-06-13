const { DataTypes } = require("sequelize");

module.exports = function (sequelize) {
    const Role = sequelize.define(
        "role",
        {
            UserId: { type: DataTypes.INTEGER },
            Role: { type: DataTypes.STRING },
        },
        {
            timestamps: false,
        }
    );

    return Role;
};
