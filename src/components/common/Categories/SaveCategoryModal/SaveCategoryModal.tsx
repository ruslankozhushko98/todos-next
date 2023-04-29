import React, { FC } from 'react';
import { Modal, Typography } from 'antd';
import { CloseOutlined } from '@ant-design/icons';
import { Formik, FormikHelpers } from 'formik';

import { SaveCategoryInitialValues } from '@/libs/utils/types';
import { saveCategoryValidationSchema } from '@/libs/utils/validationSchemas';
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
  const handleSaveCategory = (
    values: SaveCategoryInitialValues,
    formikHelpers: FormikHelpers<SaveCategoryInitialValues>
  ): void => {
    console.log(values);

    setTimeout(() => {
      onClose();
      formikHelpers.setSubmitting(false);
      formikHelpers.resetForm();
    }, 1500);
  };

  return (
    <Modal
      title={
        <Typography.Title
          level={4}
          className={classes.title}
        >
          Save Category
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
