const db = require("../db/queries");

async function getUsers(req, res) {
  let usernames = null;

  if (!req.query.search) {
    usernames = await db.getAllUsernames();
  } else {
    const { search } = req.query;
    usernames = await db.getUsernames(search);
    console.log("Usernames: ", usernames);
  }

  // since getAllUsernames returns row by row data, we extract
  // username from the row
  res.render("index", { title: "Users", usernames: usernames });
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

async function getDeleteUser(req, res) {
  await db.deleteAllUsers();
  res.redirect("/");
}

module.exports = {
  getUsers,
  getUserForm,
  postUser,
  getDeleteUser,
};
