const path = require("node:path");
const { Router } = require("express");
const indexRouter = Router();

indexRouter.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../views/form.html"));
});

module.exports = indexRouter;
