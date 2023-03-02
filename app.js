const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
// const passport = require("passport");
const User = require("./models/user");
const bcrypt = require("bcryptjs");
const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;

const indexRouter = require("./routes/index");
const usersRouter = require("./routes/users");
const routesRouter = require("./routes/routes");

const app = express();
require("dotenv").config();

const mongoose = require("mongoose");
const passport = require("passport");
mongoose.set("strictQuery", false);
const mongoDB = process.env.MONGO_CONNECTION;

main().catch((err) => console.log(err));
async function main() {
  await mongoose.connect(mongoDB);
}

const options = {
  secretOrKey: process.env.TOKEN_SECRETE,
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
};

// Need create passport-jwt strategy
passport.use(
  new JwtStrategy(options, (jwt_payload, done) => {
    User.findOne({ id: jwt_payload.sub }, (err, user) => {
      if (err) {
        return done(err, false);
      }
      if (user) {
        return done(null, user);
      } else {
        return done(err, false);
      }
    });
  })
);

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/api/v1", routesRouter);

module.exports = app;
