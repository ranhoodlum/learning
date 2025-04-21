const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// change the email, as the one here's already been deleted
async function deleteOne() {
  const deletedUser = await prisma.user.delete({
    where: {
      email: "bob@prisma.io",
    },
  });

  console.log(deletedUser);
}

async function deleteMany() {
  const deleteUser = await prisma.user.delete({
    where: {
      email: "srj2@gmail.com",
    },
  });
  console.log(deleteUser);
}

deleteMany();
