const express = require("express");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const session = require("express-session");

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(
  session({
    secret: "your secret here",
    resave: false,
    saveUninitialized: false,
  })
);
app.use(passport.initialize());
app.use(passport.session());

passport.use(
  new LocalStrategy(function (username, password, done) {
    // Replace this with your user authentication logic
    User.findOne({ username: username }, function (err, user) {
      if (err) {
        return done(err);
      }
      if (!user) {
        return done(null, false);
      }
      if (user.password !== password) {
        return done(null, false);
      }
      return done(null, user);
    });
  })
);

passport.serializeUser(function (user, done) {
  done(null, user.id);
});

passport.deserializeUser(function (id, done) {
  // Replace this with your user deserialization logic
  User.findById(id, function (err, user) {
    done(err, user);
  });
});

// Your routes go here

app.listen(3000);
