const { Router } = require("express");
const { getAuthorById } = require("../controllers/authorController");

const authorRouter = Router();

authorRouter.get("/", (req, res) => res.send("All authors"));

authorRouter.get("/:authorId", getAuthorById);

// directly assign to module.exports for
// default export, and assign to property of
// module.exports for named export
module.exports = authorRouter;
