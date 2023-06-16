import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { Form } from 'antd';
import { useFormikContext } from 'formik';

import { SignInCredentials } from '@/libs/utils/types';
import { TextField } from '@/components/layout/Form/fields';

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
          <span className="text-text text-base">
            {t('auth.signIn.fields.email.label')}
          </span>
        }
        placeholder={String(t('auth.signIn.fields.email.placeholder'))}
        hasFeedback
      />

      <TextField
        size="large"
        name="password"
        type="password"
        label={
          <span className="text-text text-base">
            {t('auth.signIn.fields.password.label')}
          </span>
        }
        placeholder={String(t('auth.signIn.fields.password.placeholder'))}
        hasFeedback
      />

      <Form.Item>
        <button
          type="submit"
          className="w-full bg-sky-600 hover:bg-sky-700 py-2 rounded-xl"
        >
          <span className="text-white text-base">
            {t('auth.signIn.signInBtn')}
          </span>
        </button>
      </Form.Item>
    </Form>
  );
};
