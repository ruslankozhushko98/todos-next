import * as Yup from 'yup';

export const saveCategoryValidationSchema = Yup.object({
  title: Yup.string().label('Title').required(),
  description: Yup.string().label('Description'),
});