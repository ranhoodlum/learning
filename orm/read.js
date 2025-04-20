const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function selectOne() {
  const user = await prisma.user.findUnique({
    where: {
      id: 1,
    },
  });
  console.log(user);
}

async function selectMany() {
  const users = await prisma.user.findMany();
  console.log(users);
}

async function selectFirst() {
  // find user where some post has likes greater than 100
  const findUser = await prisma.user.findFirst({
    where: {
      posts: {
        some: {
          likes: {
            gt: 100,
          },
        },
      },
    },
  });
  console.log(findUser);
}

async function selectFiltered() {
  const endsWithPrisma = await prisma.user.findMany({
    where: {
      email: {
        endsWith: "prisma.io",
      },
    },
  });
  console.log(endsWithPrisma);

  const users = await prisma.user.findMany({
    where: {
      // or takes in the conditions that should be orred
      OR: [
        {
          name: {
            startsWith: "E",
          },
        },
        {
          AND: {
            profileViews: {
              gt: 0,
            },
            role: {
              equals: "ADMIN",
            },
          },
        },
      ],
    },
  });
  console.log(users);

  const usersWithNoPosts = await prisma.user.findMany({
    where: {
      email: {
        endsWith: "prisma.io",
      },
      posts: {
        // some implies that at leas 1 of the values
        // in posts.published is false
        some: {
          published: false,
        },
      },
    },
  });

  console.log(usersWithNoPosts);
}

//selectOne();
//selectMany();
//selectFirst();
selectFiltered();
