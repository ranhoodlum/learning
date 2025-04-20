const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function updateOrInsert() {
  const users = await prisma.user.upsert({
    where: {
      email: "srj@gmail.com",
    },
    update: {
      name: "soooraa",
    },
    create: {
      email: "srj@gmail.com",
      name: "soooraa",
    },
  });
  console.log(users);
}
