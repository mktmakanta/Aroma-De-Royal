import { PrismaClient } from "@prisma/client";
// import bcrypt from "bcrypt";

console.log("Starting script...");
const prisma = new PrismaClient();
console.log("Prisma Client initialized.");

async function main() {
  try {
    // const password = "mkt1234";
    // const hashedPassword = await bcrypt.hash(password, 10);

    // await prisma.user.create({
    //   data: {
    //     name: "Ibrahim Makanta",
    //     email: "makanta66574@gmail.com",
    //     password: hashedPassword,
    //   },
    // });

    await prisma.product.create({
      data: {
        name: "first item",
        image: "non for now",
        brand: "Hud family",
        category: "classic",
        description: "lorem 2o this is a test and in developement",
        price: 20.5,
        countInStock: 6,
        rating: 4.5,
        user: {
          connect: { email: "mktedozhigi@gmail.com" },
        },
      },
    });

    const product = await prisma.product.findMany();
    console.dir(product, { depth: null });

    const allUsers = await prisma.user.findMany();
    console.dir(allUsers, { depth: null });
  } catch (error) {
    console.error("An error occurred:", error);
  } finally {
    await prisma.$disconnect();
    console.log("Prisma Client disconnected.");
  }
}

main();
