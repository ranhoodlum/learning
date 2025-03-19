const express = require("express");
const app = express();

// this statement tells us that this route will match
// any GET requests that go through the `app` router.
// Here, '/' is the path. the whole statement is the route
// and the callback is the middleware function
app.get("/", (req, res) => res.send("Hello, world"));

// this route *matches* any POST request to the `/messages'
// path of our app
app.post("/messages", (req, res) =>
  res.send("This is where you can see any messages."),
);

// each http verb has an app method
// you also have app.all() that matches all
// http verbs to the given path
app.all("/hola", (req, res) =>
  res.send("All types of requests match this route"),
);

// parameters in request
app.get("/:username/messages", (req, res) => {
  console.log("Params:", req.params);
  console.log("Query:", req.query);
  res.end();
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});
