const commentService = require('./commentService');

module.exports = {
    create: function create(req, res, next) {
        commentService.create(req.body)
            .then(() => res.json({ message: 'Comment created' }))
            .catch(next);
    },
    
    update: function update(req, res, next) {
        commentService.update(req.params.id, req.body)
            .then(() => res.json({ message: 'Comment updated' }))
            .catch(next);
    },
    
    _delete: function _delete(req, res, next) {
        commentService.delete(req.params.id)
            .then(() => res.json({ message: 'Comment deleted' }))
            .catch(next);
    },
    
    getAllCommentOfArticle: function getAllCommentOfArticle(req, res, next) {
        commentService.getAllCommentOfArticle(req.params.articleId)
            .then((item) => res.json(item))
            .catch(next);
    }
}


