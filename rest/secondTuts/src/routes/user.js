const { Router } = require("express");

const router = Router();

router.get("/", (req, res) => {
  res.json(Object.values(req.context.models.users));
});

router.get("/:userId", (req, res) => {
  res.json(req.context.models.users[req.params.userId]);
});

module.exports = router;
