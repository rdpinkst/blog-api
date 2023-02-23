const Post = require("../models/post");

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
exports.createPost = (req, res, next) => {
  
  res.send("Only signed in blog owner can");
};

//  Retrieve post by postId
exports.getPostById = (req, res, next) => {
  Post.findById(req.params.postid)
    .exec(function (err, thePost) {
        if(err) {
            return next(err);
        }
        res.json(thePost);
    })
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
