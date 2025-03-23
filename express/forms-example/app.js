const express = require("express");
const app = express();
const usersRouter = require("./routes/usersRouter");

// setting up the app
//app.set("views", "./views/"); this is default, so no need to set
app.set("view engine", "ejs");

// middleware to parse the incoming request body using extended engine
// more than just array and strings
//
// express.urlencoded parses the body of
// content-type: application/x-www-form-urlencoded
//
// so the data is already encoded in url, so we parse
// that and again encode that if we need to use it in our
// html templates / databases ... interesting
//
// And 1 more point. If the content type is not
// application/x-www-form-urlencoded, the body will be
// populated with empty object {}
app.use(express.urlencoded({ extended: true }));

// setting up routers
app.use("/", usersRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Listening... on port ${PORT}`);
});
