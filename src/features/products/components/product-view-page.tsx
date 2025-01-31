import { fakeProducts, Product } from '@/constants/mock-api';
import { notFound } from 'next/navigation';
import ProductForm from './product-form';
import prisma from 'prisma/client';

type TProductViewPageProps = {
  productId: string;
};

export default async function ProductViewPage({
  productId
}: TProductViewPageProps) {
  let product = null;
  let categoryArray = null;
  let pageTitle = 'Create New Product';

  const categories = await prisma.categories.findMany();
  categoryArray = categories;

  if (productId !== 'new') {
    // const data = await fakeProducts.getProductById(Number(productId));
    const data = await prisma.products.findUnique({ where: { id: productId } });
    product = data;

    if (!product) {
      notFound();
    }
    pageTitle = `Edit Product`;
  }

  return (
    <ProductForm
      initialData={product as any}
      pageTitle={pageTitle}
      categories={categoryArray as any}
    />
  );
}
