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
        jwt.sign(
          payload,
          process.env.TOKEN_SECRETE,
          (err, token) => {
            if(err) {
              return next(err);
            }
            res.status(201).json({ email: newUser.email, token });
          }
        );
      });
    });
  },
];

// Sign user in
exports.userSignin = [
  body("email").trim().isLength({ min: 1 }).escape(),
  (req, res, next) => {
    // passport.authenticate("local", (err, user, )),
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return next(errors);
    }
    const payload = {
      id: req.user._id,
    };
    jwt.sign(
      payload,
      process.env.TOKEN_SECRETE,
      (err, token) => {
        res.status(200).json({email: req.user.email, token });
      }
    );
  },
];
