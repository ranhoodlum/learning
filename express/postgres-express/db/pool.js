const { Pool } = require("pg");

// Pool is a way pg connects with the database.
//
// client is the other way
//
// information inside the object is all connection information
// read ALL properties from environment variables (later)
module.exports = new Pool({
  host: process.env.DB_HOST, // or whereever the database is hosted
  // default is localhost
  user: process.env.DB_USER,
  database: process.env.DB_NAME,
  password: process.env.DATABASE_PASSWORD,
  port: process.env.DB_PORT, // default port
});

// Same thing
// // Again, this should be read from an environment variable
// module.exports = new Pool({
//   connectionString: "postgresql://<role_name>:<role_password>@localhost:5432/top_users"
// });
