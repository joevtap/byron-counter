import { PrismaClient } from "@prisma/client";
import { Server } from "socket.io";

const COUNT_ID = 1;

const prisma = new PrismaClient();

async function seed() {
  const count = await prisma.count.upsert({
    update: {
      id: COUNT_ID,
      count: 0,
    },
    create: {
      id: COUNT_ID,
      count: 0,
    },
    where: {
      id: COUNT_ID,
    },
  });

  console.log("Seeded count:", count);
}

async function incrementCount() {
  const count = await prisma.count.update({
    data: {
      count: {
        increment: 1,
      },
    },
    where: {
      id: COUNT_ID,
    },
  });

  return count?.count;
}

async function decrementCount() {
  const count = await prisma.count.update({
    data: {
      count: {
        decrement: 1,
      },
    },
    where: {
      id: COUNT_ID,
    },
  });

  return count?.count;
}

async function getCount() {
  const count = await prisma.count.findUnique({
    where: {
      id: COUNT_ID,
    },
  });

  return count?.count;
}

async function main() {
  if (!(await getCount())) {
    await seed();
  }

  const io = new Server({
    cors: {
      origin: process.env.FRONT_END_URL || "*",
    },
  });

  io.on("connection", async (socket) => {
    io.emit("update", { count: await getCount() });

    socket.on("increment", async () => {
      const count = await incrementCount();
      io.emit("update", { count });
    });

    socket.on("decrement", async () => {
      if ((await getCount()) === 0) return;

      const count = await decrementCount();

      io.emit("update", { count });
    });
  });

  io.listen(+(process.env.APP_PORT || 8080));
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
