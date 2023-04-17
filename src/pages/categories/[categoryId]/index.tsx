import { FC } from 'react';
import { GetStaticProps, GetStaticPropsContext } from 'next';
import { useRouter } from 'next/router';
import { ParsedUrlQuery } from 'querystring';
import { LeftOutlined } from '@ant-design/icons';

import { categoriesService } from '@/services/CategoriesService';
import { Category } from '@/models';
import { MainLayout } from '@/components/layout/MainLayout/MainLayout';

import classes from './CategoryDetails.module.scss';

interface Params extends ParsedUrlQuery {
  categoryId: string;
}

interface Props {
  category: Category | null;
  errorMessage: string | null;
}

const CategoryDetails: FC<Props> = ({ category }) => {
  const { back } = useRouter();

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

export async function getStaticPaths() {
  const { data } = await categoriesService.fetchCategories();

  const paths = data?.map(category => ({
    params: { categoryId: String(category.id) },
  }));

  return {
    paths,
    fallback: true,
  };
}

export const getStaticProps: GetStaticProps<Props, Params> = async ({ params }: GetStaticPropsContext<Params>) => {
  const { data, error } = await categoriesService.fetchCategoryDetails(Number(params?.categoryId));

  return {
    props: {
      category: data,
      errorMessage: error?.message || null,
    },
  };
};

export default CategoryDetails;
