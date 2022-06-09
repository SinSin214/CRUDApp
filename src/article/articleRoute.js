const express = require('express');
const router = express.Router();
const controller = require('./articleController');

module.exports = router;

router.get('/:id', controller.getById);
router.post('/', controller.create); //{ Title, Summary, Content, UserId }
router.put('/:id', controller.update); // { Title, Summary, Content, UserId }
router.delete('/:id', controller._delete); // { UserId }
router.post('/getAllArticleOfUser', controller.getAllArticleByUserId); //{UserId}
