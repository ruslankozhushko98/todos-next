import gbFlag from '@/libs/assets/icons/gb.svg';
import ruFlag from '@/libs/assets/icons/ru.svg';

export enum ListViewModes {
  LIST_VIEW = 'LIST_VIEW',
  GALLERY_VIEW = 'GALLERY_VIEW',
}

export const icons = {
  gbFlag,
  ruFlag,
};

export enum Queries {
  FETCH_CATEGORIES = 'FETCH_CATEGORIES',
  FETCH_CATEGORY_DETAILS = 'FETCH_CATEGORY_DETAILS',
}

export enum Mutations {
  CREATE_CATEGORY = 'CREATE_CATEGORY',
  REMOVE_TODO = 'REMOVE_TODO',
  CREATE_TODO = 'CREATE_TODO',
  EDIT_TODO = 'EDIT_TODO',
}
