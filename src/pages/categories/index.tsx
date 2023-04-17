import { FC, useState } from 'react';
import { GetServerSideProps } from 'next';
import classNames from 'classnames';

import { ListViewModes } from '@/libs/utils/constants';
import { categoriesService } from '@/services/CategoriesService';
import { Category } from '@/models';
import { MainLayout } from '@/components/layout/MainLayout/MainLayout';
import { ListViewSwitcher } from '@/components/common/Categories/ListViewSwitcher/ListViewSwitcher';
import { CategoriesList } from '@/components/common/Categories/CategoriesList/CategoriesList';

import classes from './Categories.module.scss';

interface Props {
  categories: Array<Category>;
  errorMessage: string | null;
}

const Categories: FC<Props> = ({ categories }) => {
  const [listViewMode, setListViewMode] = useState(ListViewModes.LIST_VIEW);

  return (
    <MainLayout title="Categories">
      <div className={classNames(classes.row, classes.divider)}>
        <span className={classes.title}>Categories</span>

        <ListViewSwitcher
          viewMode={listViewMode}
          setViewMode={setListViewMode}
        />
      </div>

      <CategoriesList categories={categories} listViewMode={listViewMode} />
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
