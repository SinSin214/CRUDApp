const { DataTypes } = require('sequelize');

module.exports = function (sequelize) {
    const Comment = sequelize.define("comment", {
        Content: { type: DataTypes.STRING },
        UserId: { type: DataTypes.INTEGER },
        ArticleId: { type: DataTypes.INTEGER }
    });

    return Comment;
};