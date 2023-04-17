import { ChangeEvent, FC, useMemo, useState } from 'react';
import { GetServerSideProps } from 'next';
import classNames from 'classnames';

import { ListViewModes } from '@/libs/utils/constants';
import { categoriesService } from '@/services/CategoriesService';
import { Category } from '@/models';
import { MainLayout } from '@/components/layout/MainLayout/MainLayout';
import { ListViewSwitcher } from '@/components/common/Categories/ListViewSwitcher/ListViewSwitcher';
import { CategoriesList } from '@/components/common/Categories/CategoriesList/CategoriesList';
import { SearchBar } from '@/components/common/SearchBar/SearchBar';

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
      return categories.filter(category => category.title.match(search) || category.description?.match(search));
    }

    return categories;
  }, [search, categories]);

  return (
    <MainLayout title="Categories">
      <SearchBar value={search} onChange={handleSearch} />

      <div className={classNames(classes.row, classes.divider)}>
        <span className={classes.title}>Categories</span>

        <ListViewSwitcher
          viewMode={listViewMode}
          setViewMode={setListViewMode}
        />
      </div>

      <CategoriesList categories={categoriesFound} listViewMode={listViewMode} />
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
