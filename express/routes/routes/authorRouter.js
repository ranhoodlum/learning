const { Router } = require("express");

const authorRouter = Router();

authorRouter.get("/", (req, res) => req.send("All authors"));

authorRouter.get("/:authorId", (req, res) => {
  const { authorId } = req.params;
  res.send(`Author Id: ${authorId}`);
});

// directly assign to module.exports for
// default export, and assign to property of
// module.exports for named export
module.exports = authorRouter;
