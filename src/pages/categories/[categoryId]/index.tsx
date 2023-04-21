import { FC } from 'react';
import { GetStaticProps } from 'next';
import { ParsedUrlQuery } from 'querystring';
import { List, Typography } from 'antd';
import { LeftOutlined } from '@ant-design/icons';
import Link from 'next/link';

import { categoriesService } from '@/services/CategoriesService';
import { Category, Todo } from '@/models';
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
  const renderItem = (todo: Todo): JSX.Element => (
    <List.Item key={todo.id} title={todo.title}>
      <Typography.Text>
        {todo.description}
      </Typography.Text>
    </List.Item>
  );

  return (
    <MainLayout title="Category Details">
      <Link href="/categories" className={classes.backBtn}>
        <LeftOutlined className={classes.icon} />
        Back to categories list
      </Link>

      <List dataSource={category?.todos} renderItem={renderItem} />
    </MainLayout>
  );
};

export const getStaticPaths = async () => {
  const { data } = await categoriesService.fetchCategories();

  const paths = data?.map(category => ({
    params: { categoryId: String(category.id) },
  }));

  return {
    paths,
    fallback: true,
  };
};

export const getStaticProps: GetStaticProps<Props, Params> = async ({ params }) => {
  const { data, error } = await categoriesService.fetchCategoryDetails(Number(params?.categoryId));

  return {
    props: {
      category: data,
      errorMessage: error?.message || null,
    },
  };
};

export default CategoryDetails;
