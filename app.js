const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const cors = require("cors");
// const passport = require("passport");
const User = require("./models/user");
const bcrypt = require("bcryptjs");
const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const compression = require("compression");
const helmet = require("helmet");
const RateLimit = require("express-rate-limit");

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
    User.findOne({ _id: jwt_payload.sub }, (err, user) => {
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

const limit = RateLimit({
  windowMs: 1*60*1000,
  max: 20,
});

app.use(cors());
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(compression());
app.use(helmet());
app.use(limit);
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/api/v1", routesRouter);

module.exports = app;
