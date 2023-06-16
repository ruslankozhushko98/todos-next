import { ChangeEvent, FC, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { DehydratedState, dehydrate, useQuery } from '@tanstack/react-query';
import { GetStaticProps } from 'next';
import { List, Divider, Empty } from 'antd';

import { ListViewModes, Queries } from '@/libs/utils/constants';
import { queryClient } from '@/libs/config/queryClient';
import { categoriesService } from '@/services/CategoriesService';
import { Category } from '@/models';
import { MainLayout } from '@/components/layout/MainLayout/MainLayout';
import { ListViewSwitcher } from '@/components/common/Categories/ListViewSwitcher';
import { SearchBar } from '@/components/common/SearchBar';
import { CategoryItem } from '@/components/common/Categories/CategoryItem/CategoryItem';
import { SaveCategoryModal } from '@/components/common/Categories/SaveCategoryModal/SaveCategoryModal';

import classes from './Categories.module.scss';

interface Props {
  dehydratedState: DehydratedState;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const Categories: FC<Props> = ({ dehydratedState }) => {
  const { t } = useTranslation();
  const [listViewMode, setListViewMode] = useState<ListViewModes>(ListViewModes.LIST_VIEW);
  const [search, setSearch] = useState<string>('');
  const [isOpened, setIsOpened] = useState<boolean>(false);

  const { data } = useQuery({
    queryKey: [Queries.FETCH_CATEGORIES],
    queryFn: categoriesService.fetchCategories,
  });

  const toggleOpened = (): void => setIsOpened(!isOpened);

  const handleSearch = (e: ChangeEvent<HTMLInputElement>): void => setSearch(e.target.value);

  const categoriesFound: Array<Category> | undefined = useMemo(() => {
    if (search.length !== 0) {
      return data?.filter(category =>
        category.title.toLowerCase().match(search.toLowerCase()) ||
        category.description?.toLowerCase().match(search.toLowerCase())
      );
    }

    return data;
  }, [search, data]);

  const renderItem = (item: Category): JSX.Element => (
    <CategoryItem
      key={item.id}
      {...item}
      listViewMode={listViewMode}
    />
  );

  return (
    <MainLayout title={t('categories.title')}>
      <div className="flex justify-between mb-5">
        <SearchBar value={search} onChange={handleSearch} />

        <button
          type="button"
          onClick={toggleOpened}
          className="bg-sky-600 hover:bg-sky-700 px-5 rounded-xl"
        >
          <span className="text-white text-base">
            {t('categories.addCategory')}
          </span>
        </button>
      </div>

      <div className="flex justify-between items-center">
        <span className="text-text text-3xl">
          {t('categories.title')}
        </span>

        <ListViewSwitcher
          viewMode={listViewMode}
          setViewMode={setListViewMode}
        />
      </div>

      <Divider className="bg-dark4" />

      <List
        dataSource={categoriesFound}
        renderItem={renderItem}
        className={classes.list}
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

      <SaveCategoryModal
        isOpened={isOpened}
        onClose={toggleOpened}
      />
    </MainLayout>
  );
};

export const getStaticProps: GetStaticProps<Props> = async () => {
  await queryClient.prefetchQuery([Queries.FETCH_CATEGORIES], categoriesService.fetchCategories);

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
};

export default Categories;
