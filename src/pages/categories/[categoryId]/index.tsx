import React, { ChangeEvent, FC, useMemo, useState } from 'react';
import { GetStaticProps } from 'next';
import { ParsedUrlQuery } from 'querystring';
import { Divider, Empty, List, Typography } from 'antd';
import { LeftOutlined } from '@ant-design/icons';
import Link from 'next/link';

import { categoriesService } from '@/services/CategoriesService';
import { Category, Todo } from '@/models';
import { MainLayout } from '@/components/layout/MainLayout/MainLayout';
import { SearchBar } from '@/components/common/SearchBar/SearchBar';
import { TodoItem } from '@/components/common/CategoryDetails/TodosList/TodoItem';

import classes from './CategoryDetails.module.scss';

interface Params extends ParsedUrlQuery {
  categoryId: string;
}

interface Props {
  category: Category | null;
  errorMessage: string | null;
}

const CategoryDetails: FC<Props> = ({ category }) => {
  const [search, setSearch] = useState('');

  const handleSearch = (e: ChangeEvent<HTMLInputElement>): void => {
    setSearch(e.target.value);
  };

  const todosFound: Array<Todo> | undefined = useMemo(() => {
    if (search.length !== 0) {
      return category?.todos?.filter(todo =>
        todo?.title.toLowerCase().match(search.toLowerCase()) ||
        todo?.description?.toLowerCase().match(search.toLowerCase())
      );
    }

    return category?.todos;
  }, [category?.todos, search]);

  const renderItem = (todo: Todo): JSX.Element => (
    <TodoItem key={todo.id} {...todo} />
  );

  return (
    <MainLayout title="Category Details">
      <SearchBar value={search} onChange={handleSearch} />

      <Link href="/categories" className={classes.backBtn}>
        <LeftOutlined className={classes.icon} />
        Back to categories list
      </Link>

      <Divider className={classes.divider} />

      <List
        grid={{ column: 1 }}
        dataSource={todosFound}
        renderItem={renderItem}
        locale={{
          emptyText: (
            <Empty
              description={
                <Typography.Text className={classes.emptyMsg}>
                  No Data
                </Typography.Text>
              }
            />
          ),
        }}
      />
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
