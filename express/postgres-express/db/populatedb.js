#! /usr/bin/env node
// this just tells the shell to run the program in
// a modified environment (in this case, node)

const { Client } = require("pg");
const { argv } = require("node:process");

const SQL = `
CREATE TABLE IF NOT EXISTS usernames (
  id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  username VARCHAR ( 255 )
);

INSERT INTO usernames (username) 
VALUES
  ('Bryan'),
  ('Odin'),
  ('Damon');
`;

async function main() {
  console.log("sending...");
  if (!argv[2]) {
    console.log("Usage: npm run populate [URL_TO_DB]");
    return;
  }

  // don't provide default url because then, your
  // script will be dependent on your environment, which
  // we don't want.
  const url = new URL(argv[2]);
  const client = new Client({
    connectionString: url.toString(),
  });

  await client.connect();

  try {
    // we can pass object to the query as well
    // (structure of query object in docs)
    // https://node-postgres.com/apis/client#queryconfig
    await client.query(SQL);
  } catch (e) {
    console.error(e);
  } finally {
    await client.end();
    console.log("done");
  }
}

main();
