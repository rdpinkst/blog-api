const Post = require('../models/post');

// Retrieve all posts saved in database
exports.getAllPosts = (req, res, next) => {
    res.send('Getting all posts');
}

// Create a new post
exports.createPost = (req, res, next) => {
    res.send('Only signed in blog owner can');
}

//  Retrieve post by postId
exports.getPostById = (req, res, next) => {
    res.send('Get a single blog post');
}

//  Edit post by postId
exports.editPostById = (req, res, next) => {
    res.send('Edit post by id');
}

//  Delete post by postId
exports.deletePostById = (req, res, next) => {
    res.send('Delete post by id');
}