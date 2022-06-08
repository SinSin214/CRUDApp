const articleService = require('./articleService');

module.exports = {
    getById: function getById(req, res) {
        articleService.getById(req.params.id)
            .then(item => res.json(item))
            .catch((err) => {
                res.status(500).send(err);
            });
    },
    
    create: function create(req, res) {
        articleService.create(req.body)
            .then(() => res.json({ message: 'Article created' }))
            .catch((err) => {
                res.status(500).send(err);
            });
    },
    
    update: function update(req, res) {
        articleService.update(req.params.id, req.body)
            .then(() => res.json({ message: 'Article updated' }))
            .catch((err) => {
                res.status(500).send(err);
            });
    },
    
    _delete: function _delete(req, res) {
        articleService.delete(req.params.id)
            .then(() => res.json({ message: 'Article deleted' }))
            .catch((err) => {
                res.status(500).send(err);
            });
    },
    
    getAllArticleByUserId: function getAllArticleByUserId(req, res) {
        articleService.getAllArticleByUserId(req.body.UserId)
            .then((item) => res.json(item))
            .catch((err) => {
                res.status(500).send(err);
            });
    },
}
