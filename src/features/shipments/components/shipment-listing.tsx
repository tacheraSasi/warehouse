import { searchParamsCache } from '@/lib/searchparams';
import { DataTable as ProductTable } from '@/components/ui/table/data-table';
import { columns } from './shipment-tables/columns';
import prisma from 'prisma/client';

type ShipmentListingPage = {};

export default async function ShipmentListingPage({}: ShipmentListingPage) {
  const page = searchParamsCache.get('page');
  const search = searchParamsCache.get('q');
  const pageLimit = searchParamsCache.get('limit');
  const categories = searchParamsCache.get('categories');

  const filters = {
    page,
    limit: pageLimit,
    ...(search && { search }),
    ...(categories && { categories: categories })
  };

  const dataFromDb = await prisma.shipments.findMany()
  
  const shipments = dataFromDb
  const totalShipment = await prisma.shipments.count()

  return (
    <ProductTable
      columns={columns}
      data={shipments}
      totalItems={totalShipment}
    />
  );
}
