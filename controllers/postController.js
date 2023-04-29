const Post = require('../models/post');
const Comment = require('../models/comment');
const { body, validationResult } = require('express-validator');

// Retrieve all posts saved in database
exports.getAllPosts = (req, res, next) => {
  Post.find()
    .sort({ timeStamp: -1 })
    .exec(function (err, listPosts) {
      if (err) {
        res.json({ message: err.message });
        // return next(err);
      }

      const posts = [...listPosts];
      res.json(posts);
    });
};

// Create a new post
exports.createPost = [
  body("title").trim().isLength({ min: 1 }).escape(),
  body("postBody").trim().isLength({ min: 1 }).escape(),
  body("publish").trim().isLength({ min: 1 }).escape(),
  (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      // May send error array to client to display
      res.json({ error: errors.array });
      return;
    }

    const post = new Post({
      user: req.user._id,
      title: req.body.title,
      postBody: req.body.postBody,
      publish: req.body.publish,
    });

    post.save((err) => {
      if (err) {
        return next(err);
      }
      return res.status(201).json(post);
    });
  },
];

//  Retrieve post by postId
exports.getPostById = (req, res, next) => {
  Post.findById(req.params.postid).exec(function (err, thePost) {
    if (err) {
      res.json({ message: err.message });
      return;
    }
    res.status(200).json(thePost);
  });
};

//  Edit post by postId
exports.editPostById = [
  body("title").trim().isLength({ min: 1 }).escape(),
  body("postBody").trim().isLength({ min: 1 }).escape(),
  body("publish").trim().isLength({ min: 1 }).escape(),
  (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      // May send error array to client to display
      res.json({ error: errors.array });
      return;
    }

    const post = new Post({
      title: req.body.title,
      postBody: req.body.postBody,
      publish: req.body.publish,
      _id: req.params.postid,
    });

    Post.findByIdAndUpdate(req.params.postid, post, {}, (err, thepost) => {
      if (err) {
        res.json({ message: err.message });
        return;
      }
      return res.status(201).json(thepost);
    });
  },
];

//  Delete post by postId
exports.deletePostById = (req, res, next) => {
  Post.findByIdAndRemove( req.params.postid, (err) => {
    if(err) {
      res.json({ message: err.message })
      return;
    }
    Comment.deleteMany({ post: req.params.postid}, (err) => {
      if(err) {
        res.json({ message: err.message });
        return;
      }
    })
    res.json({message: 'Post and comments deleted successfully.'})
  })
};
