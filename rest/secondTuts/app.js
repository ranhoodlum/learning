const models = require("./src/models/index.js");
const express = require("express");
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const routes = require("./src/routes/index.js");

app.use((req, res, next) => {
  req.context = {
    models,
    me: models.users[1],
  };
  next();
});

app.use("/session", routes.session);
app.use("/messages", routes.message);
app.use("/users", routes.user);

app.listen(3000, () => {
  console.log("Listening");
});
