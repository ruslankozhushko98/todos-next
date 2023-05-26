import { ChangeEvent, FC, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { DehydratedState, dehydrate, useQuery } from '@tanstack/react-query';
import { GetServerSideProps } from 'next';
import { List, Row, Typography, Divider, Empty, Button } from 'antd';

import { ListViewModes, Queries } from '@/libs/utils/constants';
import { queryClient } from '@/libs/config/queryClient';
import { categoriesService } from '@/services/CategoriesService';
import { Category } from '@/models';
import { MainLayout } from '@/components/layout/MainLayout/MainLayout';
import { IsAuthMiddleware } from '@/components/layout/middlewares/IsAuthMiddleware';
import { ListViewSwitcher } from '@/components/common/Categories/ListViewSwitcher/ListViewSwitcher';
import { SearchBar } from '@/components/common/SearchBar/SearchBar';
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
    <IsAuthMiddleware>
      <MainLayout title={t('categories.title')}>
        <Row justify="space-between" className={classes.searchRow}>
          <SearchBar value={search} onChange={handleSearch} />

          <Button
            type="primary"
            htmlType="button"
            size="large"
            onClick={toggleOpened}
          >
            {t('categories.addCategory')}
          </Button>
        </Row>

        <Row justify="space-between" align="middle">
          <Typography.Text className={classes.title}>
            {t('categories.title')}
          </Typography.Text>

          <ListViewSwitcher
            viewMode={listViewMode}
            setViewMode={setListViewMode}
          />
        </Row>

        <Divider className={classes.divider} />

        <List
          dataSource={categoriesFound}
          renderItem={renderItem}
          className={classes.list}
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

        <SaveCategoryModal
          isOpened={isOpened}
          onClose={toggleOpened}
        />
      </MainLayout>
    </IsAuthMiddleware>
  );
};

export const getServerSideProps: GetServerSideProps<Props> = async () => {
  await queryClient.prefetchQuery([Queries.FETCH_CATEGORIES], categoriesService.fetchCategories);

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
};

export default Categories;
