import * as Yup from 'yup';

export const saveCategoryValidationSchema = Yup.object({
  title: Yup.string().label('Title').required(),
  description: Yup.string().label('Description'),
});

export const saveTodoValidationSchema = Yup.object({
  title: Yup.string().label('Title').required(),
  description: Yup.string().label('Description'),
  isDone: Yup.bool().label('Is done').default(false),
});

export const signInValidationSchema = Yup.object({
  email: Yup.string().email('Email is invalid').label('Email').required(),
  password: Yup.string().label('Password').required(),
});
