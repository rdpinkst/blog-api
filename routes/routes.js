const express = require('express');
const router = express.Router();

// API start
router.get('/', (req, res, next) => {
    res.send('Router started')
})

// GET/posts fetch all posts

// POST/posts create post

// GET/posts/:postid fetch post with postid

// PUT/posts/:postid edit specific post

// DELETE/posts/:postid delete specific post

// POST/posts/:postid/comments create new comment

// GET/posts/:postid/comments fetch all comments with postid



module.exports = router;