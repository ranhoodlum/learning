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

app.get("/", (req, res) => {
  // look for template called index in the the folder
  // where the views is set (above)
  //
  // second param = local variables made available
  // to that specific template, you can set the
  // the locals with res.locals as well if you
  // don't want to render the view until later
  // but want to set the values along the way
  // in preceeding middleware function
  // res.locals.message = "EJS rocks!"
  // res.render("index");
  res.render("index", { links: links });
});

app.listen(3000, () => {
  console.log("Listening");
});
