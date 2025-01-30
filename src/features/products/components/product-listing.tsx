import { Product } from '@/constants/data';
import { fakeProducts } from '@/constants/mock-api';
import { searchParamsCache } from '@/lib/searchparams';
import { DataTable as ProductTable } from '@/components/ui/table/data-table';
import { columns } from './product-tables/columns';
import prisma from 'prisma/client';

export const revalidate = 0;
export default async function ProductListingPage({
  page,
  search,
  limit
}: {
  page: number;
  search: string;
  limit: number;
}) {
  // const page = searchParamsCache.get('page');
  // const search = searchParamsCache.get('q');
  // const pageLimit = searchParamsCache.get('limit');
  // const categories = searchParamsCache.get('categories');

  // const filters = {
  //   page,
  //   limit: pageLimit,
  //   ...(search && { search }),
  //   ...(categories && { categories: categories })
  // };

  // const data = await fakeProducts.getProducts(filters);
  // const totalProducts = data.total_products;
  // const products: Product[] = data.products;

  const dataFromDb = await prisma.products.findMany({
    take: limit,
    skip: (Number(page) - 1) * limit
  });

  const products = dataFromDb;
  const totalProducts = await prisma.products.count();

  return (
    <ProductTable
      columns={columns}
      data={products as any}
      totalItems={totalProducts}
    />
  );
}
