const express = require("express");
const session = require("express-session");
const app = express();
const { Pool } = require("pg");

const pool = new Pool({
  host: "localhost",
  user: "srj",
  database: "passportjs",
  password: "onepunchman",
  port: 5432,
});

// connects to a session table for storing sessions defined
// by express-session
const sessionStore = require("connect-pg-simple")(session);

app.use(express.urlencoded({ extended: true }));

app.use((req, res, next) => {
  //console.log(req);
  next();
});

app.use(
  /**
   ** use the session middleware
   **
   ** this middleware receives the cookie data
   ** from the incoming request, if there's cookie data,
   ** and fetches the session data corresponding to the
   ** cookie data (connect.sid specifically) that was set
   ** by this middleware itself when the first request was
   ** sent.
   ** And sets req.session and other session related properties
   ** to the request object.
   **
   ** For the first time user visits the site, express
   ** creates a new session and sends the cookie to user
   ** as connect.sid: the sessionId of session it just
   ** created and stored in the database
   **/
  session({
    // stored in environment variable
    // session is only valid if the secret is valid
    secret: "some secret",
    // do you want to save the session even if nothing has changed?
    resave: false,
    // if you set it to false, it will only send the cookie when the session
    // is initialized, for examlple, when the user allows cookie or he / she
    // logs in
    //
    // set to true if you want to send the cookie always
    saveUninitialized: true,
    // and use a new store for session storage instead of default MemoryStore
    store: new sessionStore({
      pool: pool,
      // default table name for sessionStore is "session"
      tableName: "session",
    }),
    // this object is actually the session data that you
    // want to store for this cookie
    //
    // this is used to set the cookie settings for the received sessionId
    // or if the sessionId is not received from request cookies, create
    // new sessionId and set the settings for that sessionId instead.
    cookie: {
      maxAge: 1000 * 60 * 60 * 24, // 24 hours = 24 * 60 * 60 * 1000 milliseconds
    },
  }),
);

app.get("/", (req, res) => {
  // req.session and other session related
  // things are attached by the express-session
  // middleware onto the request object
  // for the rest of the application to use
  console.log(req.session);

  if (req.session.viewCount) req.session.viewCount++;
  else req.session.viewCount = 1;

  res.send(`You have visited this page ${req.session.viewCount} times`);
});

app.listen(3000, () => {
  console.log("Listening on port 3000");
});
