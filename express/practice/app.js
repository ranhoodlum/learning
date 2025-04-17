const express = require("express");
const app = express();

app.get(
  "/",
  (req, res, next) => {
    console.log("1 ran");
  },
  (req, res, next) => {
    console.log("2 ran");
  },
);

app.get("/", (req, res) => {
  console.log("3 ran");
});

app.listen(3000, () => {
  console.log("Listening on port 3000");
});
