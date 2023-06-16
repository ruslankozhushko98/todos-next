import React, { ChangeEvent, FC, useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import { GetStaticProps } from 'next';
import { ParsedUrlQuery } from 'querystring';
import { Divider, Empty, List } from 'antd';
import { LeftOutlined } from '@ant-design/icons';
import Link from 'next/link';
import { useRouter } from 'next/router';
import {
  DehydratedState,
  dehydrate,
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';

import { queryClient } from '@/libs/config/queryClient';
import { Mutations, Queries, TOAST_DURATION } from '@/libs/utils/constants';
import { categoriesService } from '@/services/CategoriesService';
import { Category, Todo } from '@/models';
import { MainLayout } from '@/components/layout/MainLayout/MainLayout';
import { SearchBar } from '@/components/common/SearchBar';
import { TodoItem } from '@/components/common/CategoryDetails/TodosList/TodoItem';
import { SaveTodoModal } from '@/components/common/CategoryDetails/SaveTodoModal/SaveTodoModal';

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
  const [selectedTodoId, setSelectedTodoId] = useState<number | null>(null);
  const { query } = useRouter();
  const queryClient = useQueryClient();
  const { data, refetch, isFetching, isRefetching } = useQuery({
    queryKey: [Queries.FETCH_CATEGORY_DETAILS, Number(query.categoryId)],
    queryFn: () => categoriesService.fetchCategoryDetails(Number(query.categoryId)),
    onSuccess: (data) => {
      queryClient.setQueryData([Queries.FETCH_CATEGORY_DETAILS], data);
    },
    onError: (error) => {
      toast(`Error: ${error.response.data.message}`, {
        type: 'error',
        position: 'top-right',
        autoClose: TOAST_DURATION,
      });
    },
  });
  const { mutate: removeTodo } = useMutation({
    mutationKey: [Mutations.REMOVE_TODO],
    mutationFn: categoriesService.removeTodo,
    onSuccess: () => {
      refetch();

      toast(t('categories.toasts.todoRemoveMessage'), {
        type: 'success',
        position: 'top-right',
        autoClose: TOAST_DURATION,
      });
    },
  });

  useEffect(() => {
    if (!isOpened && selectedTodoId !== null) {
      setSelectedTodoId(null);
    }
  }, [isOpened, selectedTodoId]);

  const toggleOpened = (): void => setIsOpened(!isOpened);

  const handleSearch = (e: ChangeEvent<HTMLInputElement>): void => setSearch(e.target.value);

  const onEdit = (todoId: number): void => {
    setSelectedTodoId(todoId);
    toggleOpened();
  };

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
      onEdit={onEdit}
    />
  );

  return (
    <MainLayout title={t('categoryDetails.title')}>
      <div className="flex justify-between items-center">
        <SearchBar value={search} onChange={handleSearch} />

        <button
          type="button"
          className="bg-sky-600 hover:bg-sky-700 px-5 py-2.5 rounded-xl"
          onClick={toggleOpened}
        >
          <span className="text-white text-base">
            {t('categoryDetails.todoList.addTodo')}
          </span>
        </button>
      </div>

      <Link
        href="/categories"
        className="bg-transparent border-none cursor-pointer pl-0 mt-4 no-underline hover:underline text-2xl text-text flex items-center w-fit"
      >
        <LeftOutlined className="text-text text-lg mr-2.5" />
        {t('categoryDetails.backBtn')}
      </Link>

      <Divider className="bg-dark4" />

      <List
        grid={{ column: 1 }}
        dataSource={todosFound?.sort((a, b) => a.id - b.id)}
        renderItem={renderItem}
        loading={isFetching || isRefetching}
        locale={{
          emptyText: (
            <Empty
              description={
                <span className="text-text text-base">
                  {t('noDataMessage')}
                </span>
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
    queryKey: [Queries.FETCH_CATEGORY_DETAILS, Number(params?.categoryId)],
    queryFn: () => categoriesService.fetchCategoryDetails(Number(params?.categoryId)),
  });

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
};

export default CategoryDetails;
