const express = require("express");
const jwt = require("jsonwebtoken");

const app = express();

app.get("/", (req, res) => {
  res.json({ message: "Hello, world!" });
});

// route that we want to protect
app.post("/api/posts", verifyToken, (req, res) => {
  // verify the token that was set by the verifyToken on req.token
  jwt.verify(req.token, "secretkey", (err, authData) => {
    if (err) {
      return res.sendStatus(403);
    }

    res.json({
      message: "Post created",
      authData,
    });
  });
});

// route to get the token
app.post("/api/login", (req, res) => {
  // mock user
  // This user object is fetched from the
  // database when the authentication succeeds.
  // i.e. we're skipping signup and login
  // to when the user is authenticated and
  // we obtain the user information from the
  // database.
  const user = {
    id: 1,
    username: "srj",
    email: "srj@gmail.com",
  };

  jwt.sign({ user: user }, "secretkey", { expiresIn: "30s" }, (err, token) => {
    res.json({
      token: token,
    });
  });
});

function verifyToken(req, res, next) {
  // get the auth header value from the
  // sender
  const bearerHeader = req.headers["authorization"];

  // check if bearerHeader has auth token
  if (typeof bearerHeader !== "undefined") {
    // FORMAT of the sent token
    // Authorization: Bearer <access_token>
    const [bearer, token] = bearerHeader.split(" ");
    req.token = token;
    next();
  } else {
    // forbidden
    res.sendStatus(403);
  }
}

app.listen(3000, () => {
  console.log("Listening on port 3000");
});
