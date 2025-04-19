// docs are confusing, because they tell you to change
// the folder where the prismaclient is generated to
// ../generated/prisma (default path is ./generated/prisma)
// but they tell you to require from "@prisma/client", which
// causes errors
//
// note that the paths provided above where we specify prisma
// where to generate our prisma client (thus, ../generated/prisma is the
// root of our project)
// are relative to the prisma module and not
// our project.
const { PrismaClient } = require("./generated/prisma");
const prisma = new PrismaClient();

prisma.user
  .findUnique({
    where: {
      id: 3,
    },
    include: {
      posts: true,
    },
  })
  .then((users) => {
    console.log(users);
  });
