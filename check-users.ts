import { prisma } from "./lib/prisma";

async function main() {
  const users = await prisma.user.findMany({
    select: {
      id: true,
      name: true,
      email: true,
      image: true
    }
  });
  console.log(JSON.stringify(users, null, 2));
}

main();
