import { PrismaClient } from "@prisma/client";
import {
  getUsersBetweenIds,
  getUsersWithIds,
  getUsersWithPosts,
} from "@prisma/client/sql";

const prisma = new PrismaClient();
const usersWithPostCounts = await prisma.$queryRawTyped(getUsersWithPosts());
const usersBetweenIds = await prisma.$queryRawTyped(getUsersBetweenIds(20, 40));
const usersWithIds = await prisma.$queryRawTyped(getUsersWithIds([20, 30, 40]));

console.log(usersWithPostCounts);
console.log(usersBetweenIds);
console.log(usersWithIds);
