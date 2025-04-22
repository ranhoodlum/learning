// file for handling data migrations
// after the schema migrations have
// been generated
//
// In this case, the schema changes
// from using "published" boolean to using
// "status" enum for the post.
//
// 1. we add a status field and update
// the table to represent the correct status according
// the "published" boolean.
// 2. We delete the "published" field outside
// of this script
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  // $transaction is used to run a transction
  // if error is thrown between transction, it
  // is not committed, and the transaction is
  // rolled back
  //
  // transaction is atomic
  //
  // tx = instance of prisma client passed inside transaction,
  // commonly called tx
  await prisma.$transaction(async (tx) => {
    const posts = await prisma.post.findMany();
    // update the boolean field for each
    // post record to an enum record
    for (const post of posts) {
      await tx.post.update({
        where: {
          id: post.id,
        },
        data: {
          status: post.published ? "Published" : "Unknown",
        },
      });
    }
  });
}

main()
  .catch(async (e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => await prisma.$disconnect());
