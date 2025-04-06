const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const pool = require("./database");
const { validPassword } = require("../lib/passwordUtils");

// by default, passportjs looks for "username" and "password" fields
const customFields = {
  usernameField: "uname",
  passwordField: "pw",
};

// parameters will be populated by passport
const verifyCallback = async function (username, password, done) {
  try {
    const { rows } = await pool.query(
      "SELECT * FROM users WHERE username = $1",
      [username],
    );
    const user = rows[0];

    if (!user) {
      return done(null, false);
    }

    // password = hash in database
    const isValid = validPassword(password, user.password, user.salt);

    if (isValid) {
      return done(null, user);
    } else {
      return done(null, false);
    }
  } catch (e) {
    done(err);
  }
};

const strategy = new LocalStrategy(customFields, verifyCallback);

passport.use(strategy);

// when passport.authenticate() is called,
// **if the user authenticates successfully,**
// the passport.serializeUser is called by the authenticate method
passport.serializeUser((user, done) => {
  // this function sets the user property in session.passport equals to this userId
  // that tells the us (and passport itself later) that the user is logged in
  done(null, user.id);
});

// this is called when the the cookie is sent again from the browser
// The userId from cookie is looked up in the session.passport.user,
// to see if it exists. If it does, user is fetched from the database
// and assigned into the req.session.user for the rest of middleware to use
passport.deserializeUser(async (userId, done) => {
  try {
    const { rows } = await pool.query("SELECT * FROM users WHERE id = $1", [
      userId,
    ]);
    const user = rows[0];

    done(null, user);
  } catch (e) {
    done(e);
  }
});
