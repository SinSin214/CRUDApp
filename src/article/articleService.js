const { Article } = require('../models');
const { Sequelize } = require('sequelize');
module.exports = {
    getById,
    create,
    update,
    delete: _delete,
    getAllArticleByUserId
};

async function getById(id) {
    return await getArticle(id);
}

async function create(params) {
    if (findArticleByTitle(params.Title)) {
        throw 'Article already existed this title';
    }

    const article = new Article(params);
    Object.assign(article, params);
    article.Date = Sequelize.literal('CURRENT_TIMESTAMP');
    await article.save();
}

async function update(id, params) {
    if (params.Title && await findArticleByTitle(params.Title)) {
        throw 'Article already existed this title';
    }
    const article = await getArticle(id);

    if (params.UserId !== article.UserId) {
        throw 'Cannot update Article of another User'
    }

    Object.assign(article, params);
    await article.save();
}

async function _delete(id) {
    const article = await getArticle(id);
    await article.destroy();
}

async function getArticle(id) {
    const item = await Article.findByPk(id);
    if (!item) throw 'Not found';
    return item;
}

async function getAllArticleByUserId(userId) {
    const item = await Article.findAll({ where: { UserId: userId } });
    if (item.length == 0) throw 'No article for User'
    return item;
}

async function findArticleByTitle(title) {
    return await Article.findOne({ where: { Title: title } })
}