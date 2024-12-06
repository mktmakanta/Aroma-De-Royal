const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcryptjs");
const prisma = new PrismaClient();

async function main() {
  // Seed Users
  const users = [
    {
      name: "Muhammad makanta",
      email: "mktedozhigi@gmail.com",
      password: bcrypt.hashSync("mkt1MAKANTA", 10),
      isAdmin: true,
    },
    {
      name: "Makanta ibrahim",
      email: "makanta66573@gmail.com",
      password: bcrypt.hashSync("mkt1MAKANTA", 10),
      isAdmin: false,
    },
    {
      name: "ibrahim muhammad",
      email: "makanta66574@gmail.com",
      password: bcrypt.hashSync("mkt1MAKANTA", 10),
      isAdmin: false,
    },
  ];

  for (const user of users) {
    await prisma.user.create({ data: user });
  }

  console.log("Users seeded!");

  // Fetch an admin user's ID to use as `userId` for the products
  const adminUser = await prisma.user.findFirst({ where: { isAdmin: true } });

  // Seed Products
  const products = [
    {
      name: "Aroma Blossom",
      image: "/images/perfumes/perfume1.jpg",
      description: "A floral fragrance with notes of jasmine and rose.",
      brand: "Aroma Sphere",
      category: "Floral",
      price: 50.99,
      countInStock: 25,
      rating: 3.7,

      userId: adminUser.id, // Associate product with admin user
    },
    {
      name: "Citrus Dream",
      image: "/images/perfumes/perfume2.jpg",
      description: "A refreshing citrus blend with lemon and orange zest.",
      brand: "Aroma Sphere",
      category: "Citrus",
      price: 45.99,
      countInStock: 30,
      rating: 4.5,

      userId: adminUser.id, // Associate product with admin user
    },
    {
      name: "Woodland Essence",
      image: "/images/perfumes/perfume3.jpg",
      description: "A woody fragrance with hints of sandalwood and cedar.",
      brand: "Aroma Sphere",
      category: "Woody",
      price: 60,
      countInStock: 15,
      rating: 3.8,

      userId: adminUser.id, // Associate product with admin user
    },
    {
      name: "Lavender Breeze",
      image: "/images/perfumes/perfume4.jpg",
      description: "A calming lavender fragrance with a hint of vanilla.",
      brand: "Aroma Sphere",
      category: "Floral",
      price: 55.5,
      countInStock: 50,
      rating: 4.6,

      userId: adminUser.id, // Associate product with admin user
    },
    {
      name: "Midnight Oud",
      image: "/images/perfumes/perfume5.jpg",
      description: "A deep and mysterious oud fragrance with hints of amber.",
      brand: "Aroma Sphere",
      category: "Oud",
      price: 85.99,
      countInStock: 10,
      rating: 4.9,

      userId: adminUser.id, // Associate product with admin user
    },
    {
      name: "Tropical Paradise",
      image: "/images/perfumes/perfume6.jpg",
      description:
        "A tropical blend with pineapple, coconut, and passion fruit.",
      brand: "Aroma Sphere",
      category: "Fruity",
      price: 48.75,
      countInStock: 20,
      rating: 4.4,

      userId: adminUser.id, // Associate product with admin user
    },
  ];

  for (const product of products) {
    await prisma.product.create({ data: product });
  }

  console.log("Products seeded!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
