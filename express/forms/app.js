require("dotenv").config();
const path = require("node:path");
const express = require("express");
const app = express();

app.use(express.urlencoded({ extended: true }));

const { body, validationResult } = require("express-validator");

const validators = [
  // validation field, error message
  body("birthdate", "Must be valid date.")
    // don't validate falsy values
    .optional({ value: "falsy" })
    .isISO8601(), // enforce a YYYY-MM-DD format

  // chaining validation methods
  body("name")
    // name must be trimmed
    .trim()
    // and not empty
    .notEmpty()
    // send this message is name is empty
    .withMessage("Name can't be empty")
    // and all characters must be alphabet
    .isAlpha()
    // this message if the above validation passes
    // but this one fails
    .withMessage("Name must contain alphabet letters"),
];

const indexRouter = require("./routers/indexRouter");

app.set("views", "./views/");
app.set("view engine", "ejs");

app.use("/", indexRouter);

app.use(express.static(path.join(__dirname, "public")));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
