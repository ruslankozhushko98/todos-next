import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { Button, Form, Row, Typography } from 'antd';
import { useFormikContext } from 'formik';

import { SaveCategoryInitialValues } from '@/libs/utils/types';
import { TextField, TextAreaField } from '@/components/layout/Form/fields';

import classes from './SaveCategoryModal.module.scss';

interface Props {
  onCancel: () => void;
}

export const SaveCategoryFormContent: FC<Props> = ({ onCancel }) => {
  const { t } = useTranslation();
  const { handleSubmit, isSubmitting } = useFormikContext<SaveCategoryInitialValues>();

  return (
    <Form onFinish={handleSubmit} layout="vertical">
      <TextField
        label={
          <Typography.Text className={classes.label}>
            {t('categories.saveCategoryModal.fields.titleField.label')}
          </Typography.Text>
        }
        placeholder={t('categories.saveCategoryModal.fields.titleField.placeholder').toString()}
        type="text"
        name="title"
        size="large"
        hasFeedback
      />

      <TextAreaField
        label={
          <Typography.Text className={classes.label}>
            {t('categories.saveCategoryModal.fields.descriptionField.label')}
          </Typography.Text>
        }
        placeholder={t('categories.saveCategoryModal.fields.descriptionField.placeholder').toString()}
        name="description"
        size="large"
        rows={10}
      />

      <Row justify="end" align="middle">
        <Button
          type="default"
          size="large"
          htmlType="button"
          onClick={onCancel}
        >
          {t('categories.saveCategoryModal.cancelBtn')}
        </Button>

        <Button
          type="primary"
          size="large"
          htmlType="submit"
          className={classes.saveBtn}
          loading={isSubmitting}
        >
          {t('categories.saveCategoryModal.saveBtn')}
        </Button>
      </Row>
    </Form>
  );
};
