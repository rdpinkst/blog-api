const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const User = require("./models/user");
const bcrypt = require("bcryptjs");

const indexRouter = require("./routes/index");
const usersRouter = require("./routes/users");
const routesRouter = require("./routes/routes");

const app = express();
require("dotenv").config();

const mongoose = require("mongoose");
const { mainModule } = require("process");
mongoose.set("strictQuery", false);
const mongoDB = process.env.MONGO_CONNECTION;

main().catch((err) => console.log(err));
async function main() {
  await mongoose.connect(mongoDB);
}

passport.use(
  new LocalStrategy((email, password, done) => {
    User.findOne({ email }, (err, user) => {
      if (err) {
        done(err);
      }
      if (!email) {
        return done(null, false, { message: "Incorrect email address" });
      }
      bcrypt.compare(password, user.password, (err, res) => {
        if (res) {
          return done(null, user);
        } else {
          return done(null, false, { message: "Incorrect password." });
        }
      });
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
