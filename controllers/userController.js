const User = require("../models/user");
const bcrypt = require("bcryptjs");
const { body, validationResult } = require("express-validator");

// Sign up new user
exports.userSignup = [
  body("email").trim().isLength({ min: 1 }).escape(),
  body("password").trim().isLength({ min: 1 }).escape(),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      // Maybe send json object of error
      return next(errors);
    }
    bcrypt.hash(req.body.password, 10, (err, hashedPassword) => {
      if (err) {
        return next(err);
      }
      const newUser = new User({
        email: req.body.email,
        password: hashedPassword,
      });
      newUser.save((err) => {
        if (err) {
          return next(err);
        }
        res.status(201).json({
          message: "New user was created.",
        });
      });
    });
  },
];

// Sign user in
exports.userSignin = (req, res, next) => {};
