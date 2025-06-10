const express = require("express");
const app = express();
const apicache = require("apicache");
const cache = apicache.middleware;
// will cache any returned data for 5 minutes
app.use(cache("5 minutes"));

app.use(express.json());

app.get("/articles", (req, res) => {
  const articles = [];
  // code to retrieve articles
  res.json(articles);
});

app.post("/articles", (req, res) => {
  // code to add new article
  res.json(req.body);
});

app.put("/articles/:id", (req, res) => {
  const { id } = req.params;
  // code to update an article
  res.json(req.body);
});

app.delete("/articles/:id", (req, res) => {
  const { id } = req.params;
  // code to delete an article
  res.json({ deleted: id });
});

// logical nesting
app.get("/articles/:id/comments", (req, res) => {
  const { id } = req.params;
  let comments = [];
  // code to get comments for given article
  res.json(comments);
});

// throwing meaningful errors
const users = [{ email: "srj@gmail.com" }];
app.post("/posts", (req, res) => {
  const { email } = req.body;
  const userExists = users.find((user) => user.email === email);
  if (userExists) {
    return res
      .status(400)
      .json({ error: "User already exists, please use a different email." });
  }

  res.json(req.body);
});

const employees = [
  { firstName: "Jane", lastName: "Smith", age: 20 },
  //...
  { firstName: "John", lastName: "Smith", age: 30 },
  { firstName: "Mary", lastName: "Green", age: 50 },
];

// filtering data
//
// pagination can be done by accepting a query
// param for `page`. When page = 1, we return
// data from index `0` to `19` i.e. `page - 1` to
// `page * 20 - 1`
//
// sorting can also be done similarly
// ex: `http://example.com/articles?sort=+author,-datepublished`
// in such a query string, `+` tells us to sort
// the output ascendingly by author and descendingly
// by date
app.get("/employees", (req, res) => {
  const { firstName, lastName, age } = req.query;
  let results = [...employees];
  if (firstName) {
    results = results.filter((result) => result.firstName === firstName);
  }

  if (lastName) {
    results = results.filter((result) => result.lastName === lastName);
  }

  if (age) {
    results = results.filter((result) => +result.age === +age);
  }

  res.json(results);
});

app.listen(3000, () => {
  console.log("Listening at port 3000");
});
