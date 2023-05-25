import { NextPage } from 'next';
// import { Formik } from 'formik';
import { useTranslation } from 'react-i18next';
import { Typography } from 'antd';

import { SignInCredentials } from '@/libs/utils/types';
// import { signInValidationSchema } from '@/libs/utils/validationSchemas';
import { authService } from '@/services/AuthService';
import { MainLayout } from '@/components/layout/MainLayout/MainLayout';

const initialValues: SignInCredentials = {
  email: '',
  password: '',
};

const SignIn: NextPage = () => {
  const { t } = useTranslation();

  return (
    <MainLayout title={t('auth.signIn.title')}>
      <Typography.Text>Sign In</Typography.Text>
      {/* <Formik
        initialValues={initialValues}
        validationSchema={signInValidationSchema}
        onSubmit={console.log}
      >
        SignIn
      </Formik> */}
    </MainLayout>
  );
};

export default SignIn;
