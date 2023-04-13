import { NextPage } from 'next';
import { useRouter } from 'next/router';

import { MainLayout } from '@/components/layout/MainLayout/MainLayout';

const CategoryDetails: NextPage = () => {
  const { query, back } = useRouter();

  return (
    <MainLayout title="Category Details">
      <button onClick={back}>
        back
      </button>

      <h1>Category {query.categoryId}</h1>
    </MainLayout>
  );
};

export default CategoryDetails;
