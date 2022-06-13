const articleService = require("./article.service");

module.exports = {
    getById: function getById(req, res, next) {
        articleService
            .getById(req.params.id)
            .then((item) => res.json(item))
            .catch((err) => {
                next(err);
            });
    },

    create: function create(req, res, next) {
        articleService
            .create(req.body)
            .then(() => res.json({ message: "Article created" }))
            .catch((err) => {
                next(err);
            });
    },

    update: function update(req, res, next) {
        articleService
            .update(req.params.id, req.body)
            .then(() => res.json({ message: "Article updated" }))
            .catch((err) => {
                next(err);
            });
    },

    _delete: function _delete(req, res, next) {
        articleService
            .delete(req.params.id, req.body)
            .then(() => res.json({ message: "Article deleted" }))
            .catch((err) => {
                next(err);
            });
    },

    getAllArticleByUserId: function getAllArticleByUserId(req, res, next) {
        articleService
            .getAllArticleByUserId(req.body.UserId)
            .then((item) => res.json(item))
            .catch((err) => {
                next(err);
            });
    },
};
