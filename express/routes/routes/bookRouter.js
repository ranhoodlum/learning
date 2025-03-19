// routes/authorRouter.js
const { Router } = require("express");

const bookRouter = Router();

bookRouter.get("/", (req, res) => res.send("All books"));
bookRouter.get(
  "/:bookId",
  (req, res, next) => {
    next();
  },
  (req, res) => {
    const { bookId } = req.params;
    res.send(`Book ID coming from second handler: ${bookId}`);
  },
);
bookRouter.post("/:bookId/reserve", (req, res) => {
  const { bookId } = req.params;
  res.send(`Book with Book ID: ${bookId} reserved!`);
});
bookRouter.get("/:bookId/reserve", (req, res) => {
  const { bookId } = req.params;
  res.send(`Status of book with Book ID: ${bookId}'s reservation`);
});

module.exports = bookRouter;
