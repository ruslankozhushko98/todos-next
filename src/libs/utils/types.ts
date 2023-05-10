export type SaveCategoryInitialValues = {
  title: string;
  description?: string;
};

export type SaveCategoryData = {
  user_id: string;
} & SaveCategoryInitialValues;
