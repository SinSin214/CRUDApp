const { DataTypes } = require("sequelize");

module.exports = function (sequelize) {
    const Comment = sequelize.define("Comment", {
        Content: { type: DataTypes.STRING },
        UserId: { type: DataTypes.INTEGER },
        ArticleId: { type: DataTypes.INTEGER },
        Deleted: { type: DataTypes.BOOLEAN },
    });

    return Comment;
};
