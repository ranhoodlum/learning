// routes/authorRouter.js
const { Router } = require("express");
const { getBookById } = require("../controllers/bookController");

const bookRouter = Router();

bookRouter.get("/", (req, res) => res.send("All books"));
bookRouter.get("/:bookId", getBookById);
bookRouter.post("/:bookId/reserve", (req, res) => {
  const { bookId } = req.params;
  res.send(`Book with Book ID: ${bookId} reserved!`);
});
bookRouter.get("/:bookId/reserve", (req, res) => {
  const { bookId } = req.params;
  res.send(`Status of book with Book ID: ${bookId}'s reservation`);
});

module.exports = bookRouter;
