import { hashPassword } from '@/lib/utils';
import prisma from './client';
import { faker } from '@faker-js/faker';

export default async function main() {
  const password = await hashPassword('password');

  // Seed Admins
  // await prisma.admins.createMany({
  //   data: [
  //     { name: 'Revaycolizer', email: 'revay@gmail.com', password }
  //     // { name: 'Ekilie', email: 'support@ekilie.com', password },
  //     // { name: 'Tachera Sasi', email: 'tacherasasi@gmail.com', password },
  //   ]
  // });

  // Seed Categories
  const categories = await Promise.all(
    Array.from({ length: 10 }).map(async () =>
      prisma.categories.create({
        data: {
          name: faker.commerce.department(),
          createdAt: faker.date.between({
            from: '2022-01-01',
            to: '2025-12-31'
          }),
          updatedAt: faker.date.recent()
        }
      })
    )
  );

  // Seed Products
  const products = await Promise.all(
    Array.from({ length: 20 }).map(async (_, index) => {
      const category = faker.helpers.arrayElement(categories);
      return prisma.products.create({
        data: {
          name: faker.commerce.productName(),
          description: faker.commerce.productDescription(),
          category: category.id,
          price: parseFloat(faker.commerce.price({ min: 5, max: 500 })),
          photoUrl: `https://api.slingacademy.com/public/sample-products/${
            index + 1
          }.png`,
          createdAt: faker.date.between({
            from: '2022-01-01',
            to: '2025-12-31'
          }),
          updatedAt: faker.date.recent()
        }
      });
    })
  );

  // Seed Inventory
  const inventory = await Promise.all(
    products.map(async (product) =>
      prisma.inventory.create({
        data: {
          productId: product.id,
          quantity: faker.number.int({ min: 10, max: 100 }),
          location: faker.location.city(),
          createdAt: faker.date.between({
            from: '2022-01-01',
            to: '2025-12-31'
          }),
          updatedAt: faker.date.recent()
        }
      })
    )
  );

  // Seed Customers
  const customers = await Promise.all(
    Array.from({ length: 10 }).map(async () =>
      prisma.customers.create({
        data: {
          name: faker.person.fullName(),
          email: faker.internet.email(),
          phone: faker.phone.number(),
          address: faker.location.streetAddress(),
          createdAt: faker.date.between({
            from: '2022-01-01',
            to: '2025-12-31'
          }),
          updatedAt: faker.date.recent()
        }
      })
    )
  );

  // Seed Orders and OrderItems
  const orders = await Promise.all(
    customers.map(async (customer) =>
      prisma.orders.create({
        data: {
          customerId: customer.id,
          totalAmount: parseFloat(faker.finance.amount({ min: 50, max: 1000 })),
          status: faker.helpers.arrayElement(['Pending', 'Delivered']),
          createdAt: faker.date.between({
            from: '2022-01-01',
            to: '2025-12-31'
          }),
          updatedAt: faker.date.recent(),
          orderItems: {
            create: Array.from({
              length: faker.number.int({ min: 1, max: 5 })
            }).map(() => {
              const product = faker.helpers.arrayElement(products);
              const quantity = faker.number.int({ min: 1, max: 10 });
              return {
                productId: product.id,
                quantity,
                price: product.price * quantity
              };
            })
          }
        }
      })
    )
  );

  // Seed Shipments
  await Promise.all(
    orders.map(async (order, i) =>
      prisma.shipments.create({
        data: {
          customer_name: customers[i].name,
          customer_email: customers[i].email,
          product_name: faker.helpers.arrayElement(products).name,
          quantity: faker.number.int({ min: 1, max: 10 }),
          createdAt: faker.date.between({
            from: '2022-01-01',
            to: '2025-12-31'
          }),
          updatedAt: faker.date.recent()
        }
      })
    )
  );

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
