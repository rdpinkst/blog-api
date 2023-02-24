const express = require('express');
const router = express.Router();

const post_controller = require('../controllers/postController');
const comment_controller = require('../controllers/commentController');

// API start
router.get('/', (req, res, next) => {
    res.send('Router started')
})

// GET/posts fetch all posts
router.get('/posts', post_controller.getAllPosts);

// POST/posts create post
router.post('/posts', post_controller.createPost);

// GET/posts/:postid fetch post with postid
router.get('/posts/:postid', post_controller.getPostById);

// PUT/posts/:postid edit specific post
router.put('/posts/:postid', post_controller.editPostById);

// DELETE/posts/:postid delete specific post
router.delete('/posts/:postid', post_controller.deletePostById);

// GET/posts/:postid/comments fetch all comments with postid
router.get('/posts/:postid/comments', comment_controller.getCommentsByPostId)

// POST/posts/:postid/comments create new comment
router.post('/posts/:postid/comments', comment_controller.createComment);



module.exports = router;