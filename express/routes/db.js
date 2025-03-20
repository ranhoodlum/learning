// db.js

const authors = [
  { id: 1, name: "Bryan" },
  { id: 2, name: "Christian" },
  { id: 3, name: "Jason" },
];

async function getAuthorById(authorId) {
  // returns a promise (think of what a then() returns)
  return authors.find((author) => author.id === authorId);
}

module.exports = { getAuthorById };
