const express = require('express');
const { getAllPost, createPost } = require('../controller/postController');
const router = express.Router();

router.get('/', getAllPost);
router.get('/user-post', getAllPost);
router.post('/:id', createPost);

module.exports = router;    