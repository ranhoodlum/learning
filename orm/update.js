const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function updateSingle() {
  // update user with data
  const updateUser = await prisma.user.update({
    where: {
      email: "srj@gmail.com",
    },
    data: {
      name: "srj",
    },
  });
  console.log(updateUser);
}

async function updateMultiple() {
  const updatedUserCount = await prisma.user.updateMany({
    where: {
      email: {
        contains: "srj",
      },
    },
    data: {
      role: "ADMIN",
    },
  });

  console.log(updatedUserCount);
}

// same as update, just with a twist that it returns
async function updateMultipleAndReturn() {
  const users = await prisma.user.updateManyAndReturn({
    where: {
      email: {
        contains: "srj",
      },
    },
    data: {
      role: "ADMIN",
    },
  });

  console.log(users);
}

async function updateNumbers() {
  const updatedPostsCount = await prisma.post.updateMany({
    data: {
      views: {
        increment: 1,
      },
      likes: {
        increment: 1,
      },
    },
  });
  console.log(updatedPostsCount);
}

//updateSingle();
updateNumbers();
