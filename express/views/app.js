const path = require("node:path");
const express = require("express");
const app = express();

// where to look for template / view files
// __dirname = path.dirname() = absolute path of the
// current module (our app) - same as unix dirname
app.set("views", path.join(__dirname, "views"));
// which engine will be used for ejs
app.set("view engine", "ejs");

const links = [
  { href: "/", text: "Home" },
  { href: "about", text: "About" },
];

const users = ["Rose", "Cake", "Biff"];

app.get("/", (req, res) => {
  // you must specify which *.ejs file to use
  // in the first parameter
  //
  // In other words, which *view* to use.
  res.render("index", { links: links, users: users });
});

app.listen(3000, () => {
  console.log("Listening");
});
