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
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const { faker } = require("@faker-js/faker");

async function read() {
  const users = await prisma.user.findMany({
    include: {
      posts: true,
    },
  });
  console.log(users);
}

async function create() {
  let includePosts = true;
  if (includePosts) {
    user = {
      data: {
        email: "srj2@gmail.com",
        name: "Saugat j Rijal",
        posts: {
          // for filling in (creating values in) the tables that are related,
          // looks like you need to pass in the values to
          // the create property of posts
          create: {
            title: "Include this Post!",
          },
        },
      },
    };
  } else {
    user = {
      email: "srj@gmail.com",
      name: "Saugat Rijal",
    };
  }

  const createUser = await prisma.user.create({ data: user });
}

async function createMany() {
  const data = Array.from({ length: 500 }).map(() => ({
    name: faker.person.fullName(),
    email: faker.internet.email(),
  }));
  const createMany = await prisma.user.createMany({
    data,
    skipDuplicates: true, // Skip 'Bobo'
  });

  // results in object with count variable indicating the
  // number of data entities that were inserted
  console.log(createMany);
}

async function createManyAndReturn() {
  const data = Array.from({ length: 100 }, () => ({
    name: faker.person.fullName(),
    email: faker.internet.email(),
  }));

  const returned = await prisma.user.createManyAndReturn({ data });
  console.log(returned);
}

async function createPosts() {
  prisma.post.create({
    data: {
      title: "Hello, world",
    },
  });
}

//create();
//createMany();
//createManyAndReturn();
//read();
createPosts();
