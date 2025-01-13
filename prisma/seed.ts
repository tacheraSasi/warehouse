import prisma from "./client"
import { faker } from "@faker-js/faker";

async function main() {
  // Seed admin
  await prisma.admin.create({
    data: {
      name: "Admin User",
      email: "admin@example.com",
      password: "securepassword123", // Will Use a hashed password in production
    },
  });

  // Seed products
  const products = Array.from({ length: 20 }, (_, index) => ({
    name: faker.commerce.productName(),
    description: faker.commerce.productDescription(),
    category: faker.commerce.department(),
    price: parseFloat(faker.commerce.price({ min: 5, max: 500, dec: 2 })),
    photoUrl: `https://api.slingacademy.com/public/sample-products/${index + 1}.png`,
    createdAt: faker.date.between({ from: '2022-01-01', to: '2023-12-31' }),
    updatedAt: faker.date.recent(),
  }));

  await prisma.product.createMany({
    data: products,
  });

  // Seed inventory
  const inventoryData = products.map((_, index) => ({
    productId: index + 1,
    quantity: faker.datatype.number({ min: 10, max: 100 }),
    location: faker.address.cityName(),
  }));

  await prisma.inventory.createMany({
    data: inventoryData,
  });

  // Seed customers
  const customers = Array.from({ length: 10 }, () => ({
    name: faker.name.fullName(),
    email: faker.internet.email(),
    phone: faker.phone.number(),
    address: faker.address.streetAddress(),
  }));

  await prisma.customer.createMany({
    data: customers,
  });

  console.log("Seeding completed!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });