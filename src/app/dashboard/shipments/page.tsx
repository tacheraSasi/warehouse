import PageContainer from '@/components/layout/page-container';
import { buttonVariants } from '@/components/ui/button';
import { Heading } from '@/components/ui/heading';
import { Separator } from '@/components/ui/separator';
import { DataTableSkeleton } from '@/components/ui/table/data-table-skeleton';
import { searchParamsCache, serialize } from '@/lib/searchparams';
import { cn } from '@/lib/utils';
import { Plus } from 'lucide-react';
import Link from 'next/link';
import { SearchParams } from 'nuqs/server';
import { Suspense } from 'react';
import ShipmentTableAction from '@/features/shipments/components/shipment-tables/product-table-action';
import ShipmentListingPage from '@/features/shipments/components/shipment-listing';

export const metadata = {
  title: 'Dashboard: Products'
};

type pageProps = {
  searchParams: SearchParams;
};

export default async function Page() {
  // Allow nested RSCs to access the search params (in a type-safe way)
  // searchParamsCache.parse(searchParams);

  // This key is used for invoke suspense if any of the search params changed (used for filters).
  // const key = serialize({ ...searchParams });

  return (
    <PageContainer>
      <div className='space-y-4'>
        <div className='flex items-start justify-between'>
          <Heading title='Shipments' description='Manage Shipments' />
          <Link
            href='/dashboard/shipment/new'
            className={cn(buttonVariants(), 'text-xs md:text-sm')}
          >
            <Plus className='mr-2 h-4 w-4' /> Add New
          </Link>
        </div>
        <Separator />
        <ShipmentTableAction />
        <Suspense
          fallback={<DataTableSkeleton columnCount={5} rowCount={10} />}
        >
          <ShipmentListingPage />
        </Suspense>
      </div>
    </PageContainer>
  );
}
