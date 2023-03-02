const User = require("../models/user");
const bcrypt = require("bcryptjs");
const { body, validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");

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
        const payload = {
          id: newUser._id,
        };
        jwt.sign(payload, process.env.TOKEN_SECRETE, (err, token) => {
          if (err) {
            return next(err);
          }
          res.status(201).json({ email: newUser.email, token });
        });
      });
    });
  },
];

// Sign user in
exports.userSignin = [
  body("email").trim().isLength({ min: 1 }).escape(),
  body("password").trim().isLength({ min: 1 }).escape(),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return next(errors);
    }
    User.findOne({ email: req.body.email }, (err, user) => {
      if (err) {
        return next(err);
      }
      if (!user) {
        return res.json({ message: "Email not found in database" });
      }
      bcrypt.compare(req.body.password, user.password, (err, response) => {
        if (err) {
          return next(err);
        }
        if (response) {
          const payload = {
            sub: user._id,
          };
          jwt.sign(payload, process.env.TOKEN_SECRETE, (err, token) => {
            return res.status(200).json({ email: user.email, token });
          });
        } else {
          return res.json({ message: "Incorrect password" });
        }
      });
    });
  },
];
