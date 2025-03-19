// initialize environment variables
require("dotenv").config();
const path = require("path");

// app.js (the name could be anything, app.js is used in docs)
const express = require("express");

// app is our server
const app = express();

// route, request = req, response = res by convention
// the parameter from second is a *chain of middleware functions*
// and not just one function.
// The last middleware function tells express to respond with
// response
app.get("/", (req, res) => res.send("Hello, world"));

// path must be resolved to absolute path
app.get("/file", (req, res) =>
  res.sendFile(path.resolve(__dirname, "index.html")),
);

// port is often specified as environment variable
// since some hosting services change the port
// we also provide a fallback value
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`express app, listening on port ${PORT}`);
});
