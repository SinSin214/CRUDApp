const Comment = require("../../models").Comment;
module.exports = {
    create,
    update,
    delete: _delete,
    getAllCommentOfArticle,
};

async function create(params) {
    const comment = new Comment(params);
    await comment.save();
}

async function update(id, params) {
    const comment = await getComment(id);
    if (comment.UserId !== params.UserId) {
        throw { message: "You can only update your Comment" };
    }
    const item = new Comment(params);
    await item.save();
}

async function _delete(id, params) {
    const comment = await getComment(id);
    if (comment.UserId !== params.UserId) {
        throw { message: "You can only delete your Comment" };
    }
    await Comment.update({ Deleted: true }, { where: { id: id } });
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
