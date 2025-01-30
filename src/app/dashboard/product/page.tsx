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
import ProductListingPage from '@/features/products/components/product-listing';
import ProductTableAction from '@/features/products/components/product-tables/product-table-action';

export const metadata = {
  title: 'Dashboard: Products'
};

type pageProps = {
  searchParams: SearchParams;
};

export default async function Page({
  searchParams
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  // Allow nested RSCs to access the search params (in a type-safe way)
  // searchParamsCache.parse(searchParams);

  // This key is used for invoke suspense if any of the search params changed (used for filters).
  // const key = serialize({ ...searchParams });

  const Mypage = (await searchParams)?.page;
  const Mysearch = (await searchParams)?.search;

  const page = typeof Mypage === 'string' ? parseInt(Mypage, 10) : 1;
  const search = typeof Mysearch === 'string' ? Mysearch : undefined;
  const limit: number = 8;
  return (
    <PageContainer>
      <div className='space-y-4'>
        <div className='flex items-start justify-between'>
          <Heading
            title='Products'
            description='Manage products (Server side table functionalities.)'
          />
          <Link
            href='/dashboard/product/new'
            className={cn(buttonVariants(), 'text-xs md:text-sm')}
          >
            <Plus className='mr-2 h-4 w-4' /> Add New
          </Link>
        </div>
        <Separator />
        <ProductTableAction />
        <Suspense
          fallback={<DataTableSkeleton columnCount={5} rowCount={10} />}
        >
          <ProductListingPage
            page={page as number}
            search={search as string}
            limit={limit}
          />
        </Suspense>
      </div>
    </PageContainer>
  );
}
