export type SaveEntityInitialValues = {
  title: string;
  description: string;
};

export type SaveCategoryData = {
  user_id: string;
} & SaveEntityInitialValues;

export type SaveTodoData = {
  category_id: number;
  isDone: boolean;
} & SaveEntityInitialValues;

export type SaveTodoInitialValues = {
  isDone: boolean;
} & SaveEntityInitialValues;

export type SignInCredentials = {
  email: string;
  password: string;
};

export type SignUpCredentials = {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  sex: 'male' | 'female' | 'other';
  dob: string;
};
