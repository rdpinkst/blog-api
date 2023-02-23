const Comment = require('../models/comment');

//  Retrieve all comments for a postId
exports.getCommentsByPostId = (req, res, next) => {
    res.send('Get all comments for a post');
}

//  Create new comment
exports.createComment = (req, res, next) => {
    res.send('Create a new comment to a post');
}