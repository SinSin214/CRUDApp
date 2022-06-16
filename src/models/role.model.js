const { DataTypes } = require("sequelize");

module.exports = function (sequelize) {
    const Role = sequelize.define(
        "Role",
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
