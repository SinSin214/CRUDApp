const express = require('express');
const router = express.Router();
const controller = require('./commentController');

module.exports = router

router.post('/', controller.create); //{ Content, UserId, ArticleId }
router.put('/:id', controller.update); //{ Content, UserId }
router.delete('/:id', controller._delete);
router.get('/getAllCommentOfArticle/:articleId', controller.getAllCommentOfArticle);