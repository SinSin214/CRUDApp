const db = require('../models');
module.exports = {
    create,
    update,
    delete: _delete,
    getAllCommentOfArticle
};

async function create(params) {
    const comment = new db.Comment(params);
    Object.assign(comment, params);
    await comment.save();
}

async function update(id, params) {
    const comment = await getComment(id);
    if (comment.UserId !== params.UserId) {
        throw 'You can only update your Comment';
    }
    Object.assign(comment, params);
    await comment.save();
}

async function _delete(id) {
    const comment = await getComment(id);
    await comment.destroy();
}

async function getComment(id) {
    const item = await db.Comment.findByPk(id);
    if (!item) throw 'Not found';
    return item;
}

async function getAllCommentOfArticle(articleId) {
    const item = await db.Comment.findAll({ where: { ArticleId: articleId }});
    if (item.length == 0) throw 'Article has no comment'
    return item;
}