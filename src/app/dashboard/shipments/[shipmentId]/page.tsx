import FormCardSkeleton from '@/components/form-card-skeleton';
import PageContainer from '@/components/layout/page-container';
import { Suspense } from 'react';
import ProductViewPage from '@/features/products/components/product-view-page';

export const metadata = {
  title: 'Dashboard : Product View'
};

type PageProps = { params: Promise<{ shipmentId: string }> };

export default async function Page({ params }: PageProps) {
  const shipmentId = (await params).shipmentId;
  return (
    <PageContainer scrollable>
      <div className='flex-1 space-y-4'>
        <Suspense fallback={<FormCardSkeleton />}>
          <ProductViewPage productId={shipmentId} />
        </Suspense>
      </div>
    </PageContainer>
  );
}
