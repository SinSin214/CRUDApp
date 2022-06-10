const { Comment } = require("../models");
module.exports = {
    create,
    update,
    delete: _delete,
    getAllCommentOfArticle,
};

async function create(params) {
    const comment = new Comment(params);
    Object.assign(comment, params);
    await comment.save();
}

async function update(id, params) {
    const comment = await getComment(id);
    if (comment.UserId !== params.UserId) {
        throw { message: "You can only update your Comment" };
    }
    Object.assign(comment, params);
    await comment.save();
}

async function _delete(id, params) {
    const comment = await getComment(id);
    if (comment.UserId !== params.UserId) {
        throw { message: "You can only update your Comment" };
    }
    await comment.destroy();
}

async function getComment(id) {
    const item = await Comment.findByPk(id);
    if (!item) throw { message: "Not found" };
    return item;
}

async function getAllCommentOfArticle(articleId) {
    const item = await Comment.findAll({ where: { ArticleId: articleId } });
    return item;
}
