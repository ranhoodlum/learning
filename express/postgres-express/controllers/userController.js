const db = require("../db/queries");

async function getUsers(req, res) {
  const usernames = await db.getAllUsernames();
  console.log("Usernames: ", usernames);
  // since getAllUsernames returns row by row data, we extract
  // username from the row
  res.send("Usernames: " + usernames.map((user) => user.username).join(", "));
}

function getUserForm(req, res) {
  res.render("form", { title: "Create new user" });
}

async function postUser(req, res) {
  const { name } = req.body;
  await db.insertUsername(name);
  console.log("Username to be saved", req.body.name);
  res.redirect("/");
}

module.exports = {
  getUsers,
  getUserForm,
  postUser,
};
