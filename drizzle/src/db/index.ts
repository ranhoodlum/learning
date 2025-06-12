import "dotenv/config";
import { drizzle } from "drizzle-orm/node-postgres";
import { usersTable } from "./schema";

const db = drizzle(process.env.DATABASE_URL!);

async function main() {
  // inferInsert is probably used to generate type for user for typescript
  // probably typeof goes through each value given by inferInsert
  // and provides type for each of them?
  const user: typeof usersTable.$inferInsert = {
    name: "John",
    age: 30,
    email: "john@example.com",
  };

  await db.insert(usersTable).values(user);
  console.log("New users created");

  const users = await db.select().from(usersTable);
  console.log("Getting all users from the database: ", users);
}

main();
