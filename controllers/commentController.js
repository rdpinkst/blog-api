const Comment = require("../models/comment");
const { body, validationResult } = require("express-validator");

//  Retrieve all comments for a postId
exports.getCommentsByPostId = (req, res, next) => {
  console.log(req.params.postid);
  Comment.find({ post: req.params.postid })
    .sort({ timeStamp: -1 })
    .exec(function (err, postComments) {
      if (err) {
        return next(err);
      }
      
      const allComments = [...postComments];
      res.status(200).json(allComments);
    });
};

//  Create new comment
exports.createComment = [
  body("username").trim().isLength({ min: 1 }).escape(),
  body("comment").trim().isLength({ min: 1 }).escape(),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      // May send errors through json
      return;
    } else {
      const comment = new Comment({
        username: req.body.username,
        comment: req.body.comment,
        post: req.params.postid,
      });
      comment.save((err) => {
        if (err) {
          return next(err);
        }
        return res.status(201).json(comment);
      });
    }
  },
];
