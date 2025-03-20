// db.js

const authors = [
  { id: 1, name: "Bryan" },
  { id: 2, name: "Christian" },
  { id: 3, name: "Jason" },
];

const books = [
  { id: 1, name: "Harry Potter" },
  { id: 2, name: "Muna Madan" },
  { id: 3, name: "Dune" },
];

async function getAuthorById(authorId) {
  // returns a promise (think of what a then() returns)
  return authors.find((author) => author.id === authorId);
}

async function getBookById(authorId) {
  // returns a promise (think of what a then() returns)
  return authors.find((author) => author.id === authorId);
}

module.exports = { getAuthorById, getBookById };
