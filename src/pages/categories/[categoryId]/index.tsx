import React, { ChangeEvent, FC, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { GetStaticProps } from 'next';
import { ParsedUrlQuery } from 'querystring';
import { Button, Divider, Empty, List, Row, Typography } from 'antd';
import { LeftOutlined } from '@ant-design/icons';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { DehydratedState, dehydrate, useMutation, useQuery } from '@tanstack/react-query';

import { queryClient } from '@/libs/config/queryClient';
import { Mutations, Queries } from '@/libs/utils/constants';
import { categoriesService } from '@/services/CategoriesService';
import { Category, Todo } from '@/models';
import { MainLayout } from '@/components/layout/MainLayout/MainLayout';
import { SearchBar } from '@/components/common/SearchBar/SearchBar';
import { TodoItem } from '@/components/common/CategoryDetails/TodosList/TodoItem';
import { SaveTodoModal } from '@/components/common/CategoryDetails/SaveTodoModal/SaveTodoModal';

import classes from './CategoryDetails.module.scss';

interface Params extends ParsedUrlQuery {
  categoryId: string;
}

interface Props {
  dehydratedState: DehydratedState;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const CategoryDetails: FC<Props> = ({ dehydratedState }) => {
  const { t } = useTranslation();
  const [search, setSearch] = useState<string>('');
  const [isOpened, setIsOpened] = useState<boolean>(false);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [selectedTodoId, setSelectedTodoId] = useState<number | null>(null);
  const { query } = useRouter();
  const { data, refetch } = useQuery({
    queryKey: [Queries.FETCH_CATEGORIES_DETAILS, Number(query.categoryId)],
    queryFn: () => categoriesService.fetchCategoryDetails(Number(query.categoryId)),
  });
  const { mutate: removeTodo } = useMutation({
    mutationKey: [Mutations.REMOVE_TODO],
    mutationFn: categoriesService.removeTodo,
    onSuccess: () => {
      refetch();
    },
  });

  const toggleOpened = (): void => setIsOpened(!isOpened);

  const handleSearch = (e: ChangeEvent<HTMLInputElement>): void => setSearch(e.target.value);

  const todosFound: Array<Todo> | undefined = useMemo(() => {
    if (search.length !== 0) {
      return data?.todos?.filter(todo =>
        todo?.title.toLowerCase().match(search.toLowerCase()) ||
        todo?.description?.toLowerCase().match(search.toLowerCase())
      );
    }

    return data?.todos;
  }, [data?.todos, search]);

  const selectedTodo: Todo | undefined = useMemo(() => {
    return data?.todos?.find(todo => todo.id === selectedTodoId);
  }, [selectedTodoId]);

  const renderItem = (todo: Todo): JSX.Element => (
    <TodoItem
      key={todo.id}
      {...todo}
      onRemove={removeTodo}
    />
  );

  return (
    <MainLayout title={t('categoryDetails.title')}>
      <Row justify="space-between" align="middle">
        <SearchBar value={search} onChange={handleSearch} />

        <Button
          type="primary"
          htmlType="button"
          size="large"
          onClick={toggleOpened}
        >
          {t('categoryDetails.todoList.addTodo')}
        </Button>
      </Row>

      <Link href="/categories" className={classes.backBtn}>
        <LeftOutlined className={classes.icon} />
        {t('categoryDetails.backBtn')}
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
                  {t('noDataMessage')}
                </Typography.Text>
              }
            />
          ),
        }}
      />

      <SaveTodoModal
        isOpened={isOpened}
        onClose={toggleOpened}
        selectedTodo={selectedTodo}
      />
    </MainLayout>
  );
};

export const getStaticPaths = async () => {
  const data = await categoriesService.fetchCategories();

  const paths = data.map((category: Category) => ({
    params: { categoryId: String(category.id) },
  }));

  return {
    paths,
    fallback: true,
  };
};

export const getStaticProps: GetStaticProps<Props, Params> = async ({ params }) => {
  await queryClient.prefetchQuery({
    queryKey: [Queries.FETCH_CATEGORIES_DETAILS, Number(params?.categoryId)],
    queryFn: () => categoriesService.fetchCategoryDetails(Number(params?.categoryId)),
  });

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
};

export default CategoryDetails;
