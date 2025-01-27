import { hashPassword } from '@/lib/utils';
import prisma from './client';
import { faker } from '@faker-js/faker';

export default async function main() {
  const password = await hashPassword('password');

  // Seed admin
  await prisma.admins.create({
    data: {
      name: 'Ekilie',
      email: 'support@ekilie.com',
      password: password
    }
  });
  await prisma.admins.create({
    data: {
      name: 'Tachera Sasi',
      email: 'tacherasasi@gmail.com',
      password: password
    }
  });

  const categories = Array.from({ length: 20 }, (_, index) => ({
    name: faker.commerce.department(),
    createdAt: faker.date.between({ from: '2022-01-01', to: '2025-12-31' }),
    updatedAt: faker.date.recent()
  }));

  await prisma.categories.createMany({
    data: categories
  });

  // Seed products
  const products = Array.from({ length: 20 }, (_, index) => ({
    name: faker.commerce.productName(),
    description: faker.commerce.productDescription(),
    category: faker.commerce.department(),
    price: parseFloat(faker.commerce.price({ min: 5, max: 500 })),
    photoUrl: `https://api.slingacademy.com/public/sample-products/${
      index + 1
    }.png`,
    createdAt: faker.date.between({ from: '2022-01-01', to: '2025-12-31' }),
    updatedAt: faker.date.recent()
  }));

  await prisma.products.createMany({
    data: products
  });

  // Seed inventory
  const inventoryData = products.map((_, index) => ({
    productId: index + 1,
    quantity: faker.number.int({ min: 10, max: 100 }),
    location: faker.location.city()
  }));

  await prisma.inventory.createMany({
    data: inventoryData
  });

  // Seed customers
  const customers = Array.from({ length: 20 }, () => ({
    name: faker.person.fullName(),
    email: faker.internet.email(),
    phone: faker.phone.number(),
    address: faker.location.streetAddress()
  }));

  await prisma.customers.createMany({
    data: customers
  });

  const shipments = customers.map((customer) => ({
    customer_name: customer.name,
    customer_email: customer.email
  }));

  console.log('Seeding completed!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
