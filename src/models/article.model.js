const { DataTypes } = require("sequelize");

module.exports = function (sequelize) {
    const Article = sequelize.define(
        "Article",
        {
            Title: { type: DataTypes.STRING },
            Summary: { type: DataTypes.STRING },
            Content: { type: DataTypes.STRING },
            Date: { type: DataTypes.DATE },
            UserId: { type: DataTypes.INTEGER },
            Deleted: { type: DataTypes.BOOLEAN },
        },
        {
            timestamps: false,
        }
    );

    return Article;
};
