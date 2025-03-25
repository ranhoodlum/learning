const { Pool } = require("pg");

// create a default client pool with
// default options
module.exports = new Pool();

// Same thing
// // Again, this should be read from an environment variable
// module.exports = new Pool({
//   connectionString: "postgresql://<role_name>:<role_password>@localhost:5432/top_users"
// });
