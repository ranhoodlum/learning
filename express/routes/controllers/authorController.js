const expressAsyncHandler = require("express-async-handler");
const CustomNotFoundError = require("../errors/customNotFoundError");
const db = require("../db");

// controller that handles a specific action
// retrieving author by their id from model
// and creating a view and sending it according
// to that data
const getAuthorById = expressAsyncHandler(async function (req, res) {
  const { authorId } = req.params;

  const author = await db.getAuthorById(Number(authorId));
  console.log(author);

  if (!author) {
    throw new CustomNotFoundError("Author Not Found");
  }

  res.send(`Author name: ${author.name}`);
});

module.exports = { getAuthorById };
