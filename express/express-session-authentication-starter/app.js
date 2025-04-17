// Gives us access to variables set in the .env file via `process.env.VARIABLE_NAME` syntax
require("dotenv").config();

const express = require("express");
const session = require("express-session");
// an instance of Passport class
var passport = require("passport");
var crypto = require("crypto");
var routes = require("./routes");
const pool = require("./config/database");
// Need to require the entire Passport config module so app.js knows about it
require("./config/passport");

/**
 * -------------- GENERAL SETUP ----------------
 */

// Create the Express application
var app = express();

app.use(express.urlencoded({ extended: true }));

/**
 * -------------- SESSION SETUP ----------------
 */

// create a pg sessionStore for the session
const sessionStore = require("connect-pg-simple")(session);

app.use(
  session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: true,
    // use instance of that sessionstore for storing session
    store: new sessionStore({
      pool: pool,
      // default name is session, but to make it more explicit
      tableName: "session",
    }),
    cookie: {
      maxAge: 1000 * 60 * 60 * 24, // 24 hours
    },
  }),
);

/**
 * -------------- PASSPORT AUTHENTICATION ----------------
 */

// we only have to use this because we're using an older
// version of passport (newer versions don't need this)
app.use(passport.initialize());

// if sessions are being utilized, and login session is
// created, then this middleware populates req.user
// with the user,
// passport.authenticate ensures that the user is logged
// in successfully and the session stores the information
// about the user that is required to verify users later.
// and populates req.user
//
// passport.session() ensures that the user *stays* logged in
// by reading the user out of the session and
// storing the user in req.user if succefull,
// if unsuccessful, it does nothing
//
// same as calling passport.authenticate("session")
// i.e. authenticate the user with the help of "session" strategy
// session is the built in strategy for passportjs
app.use(passport.session());

app.use((req, res, next) => {
  // express-session creates this on session()
  console.log(req.session);
  // passport middleware creates this on passport.authenticate()
  // if authenticated successfully
  console.log(req.user);
  next();
});

/**
 * -------------- ROUTES ----------------
 */

// Imports all of the routes from ./routes/index.js
app.use(routes);

/**
 * -------------- SERVER ----------------
 */

// Server listens on http://localhost:3000
app.listen(3000);
