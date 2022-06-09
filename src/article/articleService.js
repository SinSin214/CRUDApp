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
    if (await findArticleByTitle(params.Title)) {
        throw ({ message: 'Article already existed this title' });
    }

    const article = new Article(params);
    Object.assign(article, params);
    article.Date = Sequelize.literal('CURRENT_TIMESTAMP');
    await article.save();
}

async function update(id, params) {
    if (await findArticleByTitle(params.Title)) {
        throw ({ message: 'Article already existed this title' });
    }

    const article = await getArticle(id);

    if (params.UserId !== article.UserId) {
        throw ({ message: 'Cannot update Article of another User' });
    }

    Object.assign(article, params);
    await article.save();
}

async function _delete(id, params) {
    const article = await getArticle(id);
    if (article.UserId !== params.UserId) {
        throw ({ message: 'Cannot delete Article of another User' });
    }

    await article.destroy();
}

async function getArticle(id) {
    const item = await Article.findByPk(id);
    if (!item) throw ({ message: 'Article not found' });
    return item;
}

async function getAllArticleByUserId(userId) {
    const item = await Article.findAll({ where: { UserId: userId } });
    return item;
}

async function findArticleByTitle(title) {
    return await Article.findOne({ where: { Title: title } })
}