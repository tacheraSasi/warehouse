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
  let pageTitle = 'Create New Product';

  if (productId !== 'new') {
    // const data = await fakeProducts.getProductById(Number(productId));
    const data = await prisma.products.findUnique({where: {id: productId}});
    const categories = await prisma.categories.findMany();
    product = data;
    if (!product) {
      notFound();
    }
    pageTitle = `Edit Product`;
  }

  return <ProductForm initialData={product} pageTitle={pageTitle} categories={categories} />;
}
