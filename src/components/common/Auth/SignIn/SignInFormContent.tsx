import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { Button, Form, Typography } from 'antd';
import { useFormikContext } from 'formik';

import { SignInCredentials } from '@/libs/utils/types';
import { TextField } from '@/components/layout/Form/fields';

import classes from './SignIn.module.scss';

export const SignInFormContent: FC = () => {
  const { t } = useTranslation();
  const { handleSubmit } = useFormikContext<SignInCredentials>();

  return (
    <Form
      name="sign-in"
      onFinish={handleSubmit}
      layout="vertical"
    >
      <TextField
        size="large"
        name="email"
        type="email"
        label={
          <Typography.Text className={classes.label}>
            {t('auth.signIn.fields.email.label')}
          </Typography.Text>
        }
        placeholder={String(t('auth.signIn.fields.email.placeholder'))}
        hasFeedback
      />

      <TextField
        size="large"
        name="password"
        type="password"
        label={
          <Typography.Text className={classes.label}>
            {t('auth.signIn.fields.password.label')}
          </Typography.Text>
        }
        placeholder={String(t('auth.signIn.fields.password.placeholder'))}
        hasFeedback
      />

      <Form.Item>
        <Button
          htmlType="submit"
          type="primary"
          size="large"
          className={classes.signInBtn}
        >
          <Typography.Text className={classes.signInBtnText}>
            {t('auth.signIn.signInBtn')}
          </Typography.Text>
        </Button>
      </Form.Item>
    </Form>
  );
};
