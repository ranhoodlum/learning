const path = require("node:path");
const { Pool } = require("pg");
const express = require("express");
// we're not using express-session directly
// (but its a dependency used by passportjs)
const session = require("express-session");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;

const pool = new Pool({
  host: "localhost",
  user: "srj",
  database: "passportjs",
  password: "onepunchman",
  port: 5432,
});

passport.use(
  // the passed function is want will be called when we call passport.authenticate
  new LocalStrategy(async (username, password, done) => {
    try {
      const { rows } = await pool.query(
        "SELECT * FROM users WHERE username = $1",
        [username],
      );
      const user = rows[0];

      if (!user) {
        // done acts a bit like middleware and is called by passport
        // to do the authentication later
        // error, user, options
        return done(null, false, { message: "Incorrect Username" });
      }

      if (user.password !== password) {
        return done(null, false, { message: "Incorrect Password" });
      }

      return done(null, user);
    } catch (err) {
      return done(err);
    }
  }),
);

// passport calls a function
// from express-session that uses some data to create a cookie
// called connect.sid that is stored in the user's browser

// serializeUser takes in the data passport is looking for
// when creating this cookie
passport.serializeUser((user, done) => {
  // store user.id in the cookie
  done(null, user.id);
});

// since id was what was serialized, when we get
// the id back from the browser, we check if it's
// the same as the one we serialized
passport.deserializeUser(async (id, done) => {
  try {
    const { rows } = await pool.query("SELECT * FROM users WHERE id=$1", [id]);
    const user = rows[0];

    // this attaches user to our request for rest
    // of the middlewares
    // req.user
    done(null, user);
  } catch (err) {
    done(err);
  }
});

const app = express();
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

// set up a session with options
app.use(session({ secret: "cats", resave: false, saveUninitialized: false }));
app.use(passport.session());
app.use(express.urlencoded({ extended: false }));

// routes
// if the log in is successful, cookie is created req.user is populated
// with user object, else, nothing
app.get("/", (req, res) => res.render("index", { user: req.user }));
// create users
app.get("/sign-up", (req, res) => res.render("sign-up-form"));
app.post("/sign-up", async (req, res, next) => {
  try {
    // MAKE SURE to
    // 1. sanitize
    // 2. not use plain text to store passwords
    // later. For now, we're doing this for brevity,
    // to learn the core of auth.
    await pool.query("INSERT INTO users (username, password) VALUES ($1, $2)", [
      req.body.username,
      req.body.password,
    ]);
    res.redirect("/");
  } catch (e) {
    return next(err);
  }
});
app.get("/log-in", (req, res) => {
  res.render("log-in-form");
});
app.post(
  "/log-in",
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/",
  }),
);
app.get("/log-out", (req, res, next) => {
  // logout method is added by passport, along with .user
  // when the user successfully logged in
  //
  // what does it do? - just delete the cookie?
  req.logout((err) => {
    if (err) {
      return next(err);
    }

    res.redirect("/");
  });
});

app.use((err, req, res, next) => {
  console.error(err);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("Listening on PORT", PORT);
});
