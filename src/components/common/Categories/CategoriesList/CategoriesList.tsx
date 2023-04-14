import { FC } from 'react';

import { ListViewModes } from '@/libs/utils/constants';
import { Category } from '@/models';
import { CategoryItem } from './CategoryItem';

import classes from './CategoriesList.module.scss';

interface Props {
  categories: Array<Category>;
  listViewMode: ListViewModes;
}

export const CategoriesList: FC<Props> = ({ categories, listViewMode }) => {
  const renderItem = (category: Category): JSX.Element => (
    <CategoryItem
      key={category.id}
      {...category}
      listViewMode={listViewMode}
    />
  );

  return (
    <div className={classes.list}>
      {categories?.map(renderItem)}
    </div>
  );
};
