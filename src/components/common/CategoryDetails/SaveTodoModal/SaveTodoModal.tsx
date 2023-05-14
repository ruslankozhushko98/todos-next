import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import { Formik, FormikHelpers } from 'formik';
import { Modal, Typography } from 'antd';
import { CloseOutlined } from '@ant-design/icons';

import { SaveTodoInitialValues } from '@/libs/utils/types';
import { saveTodoValidationSchema } from '@/libs/utils/validationSchemas';
import { Mutations, Queries } from '@/libs/utils/constants';
import { categoriesService } from '@/services/CategoriesService';
import { Todo } from '@/models';
import { SaveTodoFormContent } from './SaveTodoFormContent';

import classes from './SaveTodoModal.module.scss';

interface Props {
  isOpened: boolean;
  onClose: () => void;
  selectedTodo?: Todo;
}

const initialValues = {
  title: '',
  description: '',
  isDone: false,
};

export const SaveTodoModal: FC<Props> = ({ isOpened, onClose, selectedTodo }) => {
  const { t } = useTranslation();
  const { query } = useRouter();
  const queryClient = useQueryClient();
  const { mutate: createTodo } = useMutation({
    mutationKey: [Mutations.CREATE_TODO],
    mutationFn: categoriesService.createTodo,
    onSuccess: () => {
      queryClient.invalidateQueries([Queries.FETCH_CATEGORIES_DETAILS]);
    },
  });
  const { mutate: editTodo } = useMutation({
    mutationKey: [Mutations.EDIT_TODO],
    mutationFn: categoriesService.editTodo,
    onSuccess: () => {
      queryClient.invalidateQueries([Queries.FETCH_CATEGORIES_DETAILS]);
    },
  });

  const handleSaveTodo = (
    values: SaveTodoInitialValues, 
    formikHelpers: FormikHelpers<SaveTodoInitialValues>,
  ): void => {
    if (selectedTodo) {
      editTodo({
        ...selectedTodo,
        ...values,
        category_id: Number(query?.categoryId),
      });
    } else {
      createTodo({
        ...values,
        category_id: Number(query?.categoryId),
      });
    }

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
      centered
      className={classes.modal}
    >
      <Formik
        initialValues={initialValues}
        validationSchema={saveTodoValidationSchema}
        onSubmit={handleSaveTodo}
      >
        <SaveTodoFormContent onCancel={onClose} />
      </Formik>
    </Modal>
  );
};
