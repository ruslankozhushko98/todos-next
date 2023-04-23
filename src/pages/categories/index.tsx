import { ChangeEvent, FC, useMemo, useState } from 'react';
import { GetServerSideProps } from 'next';
import { List, Row, Typography, Divider, Empty } from 'antd';

import { ListViewModes } from '@/libs/utils/constants';
import { categoriesService } from '@/services/CategoriesService';
import { Category } from '@/models';
import { MainLayout } from '@/components/layout/MainLayout/MainLayout';
import { ListViewSwitcher } from '@/components/common/Categories/ListViewSwitcher/ListViewSwitcher';
import { SearchBar } from '@/components/common/SearchBar/SearchBar';
import { CategoryItem } from '@/components/common/Categories/CategoryItem/CategoryItem';

import classes from './Categories.module.scss';

interface Props {
  categories: Array<Category>;
  errorMessage: string | null;
}

const Categories: FC<Props> = ({ categories }) => {
  const [listViewMode, setListViewMode] = useState(ListViewModes.LIST_VIEW);
  const [search, setSearch] = useState<string>('');

  const handleSearch = (e: ChangeEvent<HTMLInputElement>): void => {
    setSearch(e.target.value);
  };

  const categoriesFound: Array<Category> = useMemo(() => {
    if (search.length !== 0) {
      return categories.filter(category =>
        category.title.toLowerCase().match(search.toLowerCase()) ||
        category.description?.toLowerCase().match(search.toLowerCase())
      );
    }

    return categories;
  }, [search, categories]);

  const renderItem = (item: Category): JSX.Element => (
    <CategoryItem
      key={item.id}
      {...item}
      listViewMode={listViewMode}
    />
  );

  return (
    <MainLayout title="Categories">
      <SearchBar value={search} onChange={handleSearch} />

      <Row justify="space-between" align="middle">
        <Typography.Text className={classes.title}>
          Categories
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

export const getServerSideProps: GetServerSideProps<Props> = async () => {
  const { data, error } = await categoriesService.fetchCategories();

  return {
    props: {
      categories: data || [],
      errorMessage: error?.message || null,
    },
  };
};

export default Categories;
