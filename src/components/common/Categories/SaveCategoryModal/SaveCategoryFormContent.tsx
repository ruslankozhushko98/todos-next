import React, { FC } from 'react';
import { Button, Form, Row, Typography } from 'antd';
import { useFormikContext } from 'formik';

import { SaveCategoryInitialValues } from '@/libs/utils/types';
import { TextField, TextAreaField } from '@/components/layout/Form/fields';

import classes from './SaveCategoryModal.module.scss';

interface Props {
  onCancel: () => void;
}

export const SaveCategoryFormContent: FC<Props> = ({ onCancel }) => {
  const { handleSubmit, isSubmitting } = useFormikContext<SaveCategoryInitialValues>();

  return (
    <Form onFinish={handleSubmit} layout="vertical">
      <TextField
        label={
          <Typography.Text className={classes.label}>
            Title
          </Typography.Text>
        }
        placeholder="Enter title"
        type="text"
        name="title"
        size="large"
        hasFeedback
      />

      <TextAreaField
        label={
          <Typography.Text className={classes.label}>
            Description
          </Typography.Text>
        }
        placeholder="Enter description"
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
          Cancel
        </Button>

        <Button
          type="primary"
          size="large"
          htmlType="submit"
          className={classes.saveBtn}
          loading={isSubmitting}
        >
          Save
        </Button>
      </Row>
    </Form>
  );
};
