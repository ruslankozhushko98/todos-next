import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Modal, Typography } from 'antd';
import { CloseOutlined } from '@ant-design/icons';
import { Formik, FormikHelpers } from 'formik';

import { SaveEntityInitialValues } from '@/libs/utils/types';
import { saveCategoryValidationSchema } from '@/libs/utils/validationSchemas';
import { Mutations, Queries, TOAST_DURATION } from '@/libs/utils/constants';
import { categoriesService } from '@/services/CategoriesService';
import { SaveCategoryFormContent } from './SaveCategoryFormContent';

import classes from './SaveCategoryModal.module.scss';

const initialValues: SaveEntityInitialValues = {
  title: '',
  description: '',
};

interface Props {
  isOpened: boolean;
  onClose: () => void;
}

export const SaveCategoryModal: FC<Props> = ({ isOpened, onClose }) => {
  const { t } = useTranslation();
  const queryClient = useQueryClient();
  const { mutate } = useMutation({
    mutationKey: [Mutations.CREATE_CATEGORY],
    mutationFn: categoriesService.createCategory,
    onSuccess: () => {
      toast('Success', {
        type: 'success',
        autoClose: TOAST_DURATION,
      });

      queryClient.invalidateQueries([Queries.FETCH_CATEGORIES]);
    },
  });

  const handleSaveCategory = (
    values: SaveEntityInitialValues,
    formikHelpers: FormikHelpers<SaveEntityInitialValues>
  ): void => {
    mutate({
      ...values,
      user_id: '7416266e-211f-49b6-88bf-d8ce0ba8fbfc',
    });

    onClose();

    formikHelpers.setSubmitting(false);
    formikHelpers.resetForm();
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
      destroyOnClose
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
