import { FC } from 'react';
import { NextPageContext } from 'next';
import { useRouter } from 'next/router';
import { LeftOutlined } from '@ant-design/icons';

import { supabase } from '@/libs/config/supabase';
import { Category } from '@/models';
import { MainLayout } from '@/components/layout/MainLayout/MainLayout';

import classes from './CategoryDetails.module.scss';
import { categoriesService } from '@/services/CategoriesService';

interface Props {
  category: Category | null;
  errorMessage: string | null;
}

const CategoryDetails: FC<Props> = ({ category }) => {
  const { back } = useRouter();

  if (!category) {
    return <h3>Loading...</h3>;
  }

  return (
    <MainLayout title="Category Details">
      <button onClick={back} className={classes.backBtn}>
        <LeftOutlined className={classes.icon} />

        <span className={classes.btnText}>
          Category {category?.id}
        </span>
      </button>
    </MainLayout>
  );
};

export async function getServerSideProps({ query }: NextPageContext) {
  const { data, error } = await categoriesService.fetchCategoryDetails(Number(query.categoryId));

  return {
    props: {
      category: data,
      errorMessage: error?.message || null,
    },
  };
}

export default CategoryDetails;
