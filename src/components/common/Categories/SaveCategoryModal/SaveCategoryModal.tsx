import React, { FC } from 'react';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { Modal, Typography } from 'antd';
import { CloseOutlined } from '@ant-design/icons';
import { Formik, FormikHelpers } from 'formik';

import { SaveCategoryInitialValues } from '@/libs/utils/types';
import { saveCategoryValidationSchema } from '@/libs/utils/validationSchemas';
import { categoriesApi, useCreateCategoryMutation } from '@/store/categories/categoriesApi';
import { SaveCategoryFormContent } from './SaveCategoryFormContent';

import classes from './SaveCategoryModal.module.scss';

const initialValues: SaveCategoryInitialValues = {
  title: '',
  description: '',
};

interface Props {
  isOpened: boolean;
  onClose: () => void;
}

export const SaveCategoryModal: FC<Props> = ({ isOpened, onClose }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [createCategory] = useCreateCategoryMutation();

  const handleSaveCategory = async (
    values: SaveCategoryInitialValues,
    formikHelpers: FormikHelpers<SaveCategoryInitialValues>
  ): Promise<void> => {
    await createCategory({
      ...values,
      user_id: '7416266e-211f-49b6-88bf-d8ce0ba8fbfc',
    });

    onClose();

    formikHelpers.setSubmitting(false);
    formikHelpers.resetForm();

    dispatch(categoriesApi.util.invalidateTags(['Categories']));
  };

  return (
    <Modal
      title={
        <Typography.Title
          level={4}
          className={classes.title}
        >
          {t('categories.saveCategoryModal.title')}
        </Typography.Title>
      }
      closeIcon={<CloseOutlined className={classes.closeIcon} />}
      open={isOpened}
      onCancel={onClose}
      footer={null}
      centered
      className={classes.modal}
    >
      <Formik
        initialValues={initialValues}
        validationSchema={saveCategoryValidationSchema}
        onSubmit={handleSaveCategory}
      >
        <SaveCategoryFormContent onCancel={onClose} />
      </Formik>
    </Modal>
  );
};
