const pool = require("./pool");

// project requires us 2 db interactions
// 1 -- get all the usernames
// 2 -- insert a new user
// so we create 2 functions for that

async function getAllUsernames() {
  const { rows, fields, command, rowCount } = await pool.query(
    "SELECT * FROM usernames",
  );
  console.log(rows, fields, command, rowCount);
  return rows;
}

async function insertUsername(username) {
  // we don't do `${username}` directly to prevent sql injection
  // parameterization is the utility provided by pg library
  await pool.query("INSERT INTO usernames (username) VALUES ($1)", [username]);
}

module.exports = {
  getAllUsernames,
  insertUsername,
};
