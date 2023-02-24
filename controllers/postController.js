const Post = require("../models/post");
const { body, validationResult } = require("express-validator");

// Retrieve all posts saved in database
exports.getAllPosts = (req, res, next) => {
  Post.find()
    .sort({ timeStamp: -1 })
    .exec(function (err, listPosts) {
      if (err) {
        return next(err);
      }

      const posts = [...listPosts];
      res.json(posts);
    });
};

// Create a new post
exports.createPost = [
  body('title').trim().isLength({ min: 1 }).escape(),
  body('postBody').trim().isLength({ min: 1 }).escape(),
  body('publish').trim().isLength({ min: 1 }).escape(),
  (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      // May send error array to client to display
      return;
    }

    const post = new Post({
      title: req.body.title,
      postBody: req.body.postBody,
      publish: req.body.publish,
    });

    post.save((err) => {
      if (err) {
        return next(err);
      }
      // Post saved to database
      console.log("Saved");
      res.status(200).json(post);
      return;
    });
  },
];

//  Retrieve post by postId
exports.getPostById = (req, res, next) => {
  Post.findById(req.params.postid).exec(function (err, thePost) {
    if (err) {
      return next(err);
    }
    res.json(thePost);
  });
  res.send("Get a single blog post");
};

//  Edit post by postId
exports.editPostById = (req, res, next) => {
  res.send("Edit post by id");
};

//  Delete post by postId
exports.deletePostById = (req, res, next) => {
  res.send("Delete post by id");
};
