const expressAsyncHandler = require("express-async-handler");
const CustomNotFoundError = require("../errors/customNotFoundError");
const db = require("../db");

// book controller
const getBookById = expressAsyncHandler(async function (req, res) {
  const { bookId } = req.params;

  const book = await db.getBookById(Number(bookId));

  if (!book) {
    throw new CustomNotFoundError("Book Not Found");
  }

  res.send(`Book name: ${book.name}`);
});

module.exports = { getBookById };
