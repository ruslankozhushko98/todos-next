import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { useFormikContext } from 'formik';
import { Button, Form, Row, Typography } from 'antd';

import { SaveTodoInitialValues } from '@/libs/utils/types';
import {
  TextAreaField,
  TextField,
  SwitchField,
} from '@/components/layout/Form/fields';

import classes from './SaveTodoModal.module.scss';

interface Props {
  onCancel: () => void;
}

export const SaveTodoFormContent: FC<Props> = ({ onCancel }) => {
  const { t } = useTranslation();
  const { handleSubmit, isSubmitting } = useFormikContext<SaveTodoInitialValues>();

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
        autoFocus
        hasFeedback
      />

      <TextAreaField
        className={classes.textarea}
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

      <Row justify="end">
        <SwitchField
          formItemClassName={classes.formItemSwitch}
          name="isDone"
          label={
            <Typography.Text className={classes.label}>
              {t('categories.saveCategoryModal.fields.switchField.label')}
            </Typography.Text>
          }
        />
      </Row>

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
