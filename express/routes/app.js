/*
 * Creating a server that handles the following routes:
 * ----- Index routes
 * GET /
 * GET /about
 * GET /contact
 * POST /contact
 *
 * ----- Books
 * GET /books
 * GET /books/:bookId
 * GET /books/:bookId/reserve
 * POST /books/:bookId/reserve
 *
 * ----- Authors
 * GET /authors
 * GET /authors/:authorId
 *
 * Since there are so many routes that seem to be related,
 * we divide the entire server router into different router groups,
 * that makes routing easier to manage.
 */

const express = require("express");
const app = express();
const authorRouter = require("./routes/authorRouter");
const booksRouter = require("./routes/bookRouter");
const indexRouter = require("./routes/indexRotuer");

app.use("/authors", authorRouter);
app.use("/books", booksRouter);
app.use(
  "/",
  (req, res, next) => {
    console.log("logged for the index");
    // the next must be called to pass the
    // control to the next middleware
    // if not, how will this function know that
    // where the next middleware exists
    next();
  },
  indexRouter,
);

// Every thrown error in the application or the previous
// middleware function calling `next` with an error as an
// argument will eventually go to this ( error ) middleware function
app.use((err, req, res, next) => {
  console.error(err);
  res.status(err.statusCode || 500).send(err.message);
});

const PORT = 3000;
app.listen(3000, () => {
  console.log(`Listening on port ${PORT}`);
});
