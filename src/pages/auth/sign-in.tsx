import { GetServerSideProps, NextPage } from 'next';
import { getCsrfToken, signIn } from 'next-auth/react';
import { Formik, FormikHelpers } from 'formik';
import { useTranslation } from 'react-i18next';
import { Button, Row, Typography } from 'antd';
import { GoogleOutlined } from '@ant-design/icons';

import { SignInCredentials } from '@/libs/utils/types';
import { signInValidationSchema } from '@/libs/utils/validationSchemas';
import { MainLayout } from '@/components/layout/MainLayout/MainLayout';
import { SignInFormContent } from '@/components/common/Auth/SignIn/SignInFormContent';

import classes from './Auth.module.scss';

const initialValues: SignInCredentials = {
  email: '',
  password: '',
};

const SignIn: NextPage = () => {
  const { t } = useTranslation();

  const handleSignIn = async (
    data: SignInCredentials,
    { setSubmitting }: FormikHelpers<SignInCredentials>,
  ): Promise<void> => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const res = await signIn('credentials', {
      redirect: true,
      callbackUrl: '/categories',
      email: data.email,
      password: data.password,
    });

    setSubmitting(false);
  };

  const handleSignInWith = (provider: string) => async () => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const res = await signIn(provider, {
      redirect: true,
      callbackUrl: '/categories',
    });
  };

  return (
    <MainLayout title={t('auth.signIn.title')} className={classes.formWrapper}>
      <Formik
        initialValues={initialValues}
        validationSchema={signInValidationSchema}
        onSubmit={handleSignIn}
      >
        <SignInFormContent />
      </Formik>

      <Typography.Title level={3} className={classes.subtitle}>
        {t('auth.orYouCan')}
      </Typography.Title>

      <Button
        htmlType="button"
        className={classes.btn}
        size="large"
        onClick={handleSignInWith('google')}
      >
        <GoogleOutlined className={classes.icon} />

        <Typography.Text>
          Sign in with Google
        </Typography.Text>
      </Button>
    </MainLayout>
  );
};

export default SignIn;


