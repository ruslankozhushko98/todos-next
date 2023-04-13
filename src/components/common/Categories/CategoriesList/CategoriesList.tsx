import { FC } from 'react';

import { Category } from '@/models';
import { CategoryItem } from './CategoryItem';

import classes from './CategoriesList.module.scss';

interface Props {
  categories: Array<Category>;
}

const renderItem = (category: Category): JSX.Element => (
  <CategoryItem key={category.id} {...category} />
);

export const CategoriesList: FC<Props> = ({ categories }) => (
  <div className={classes.list}>
    {categories?.map(renderItem)}
  </div>
);
