import { NextPage } from 'next';
import { signIn } from 'next-auth/react';
import { Formik, FormikHelpers } from 'formik';
import { useTranslation } from 'react-i18next';
import { GoogleOutlined } from '@ant-design/icons';

import { SignInCredentials } from '@/libs/utils/types';
import { signInValidationSchema } from '@/libs/utils/validationSchemas';
import { MainLayout } from '@/components/layout/MainLayout/MainLayout';
import { SignInFormContent } from '@/components/common/Auth/SignIn/SignInFormContent';

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
    <MainLayout title={t('auth.signIn.title')} className="w-3/6 mx-auto">
      <Formik
        initialValues={initialValues}
        validationSchema={signInValidationSchema}
        onSubmit={handleSignIn}
      >
        <SignInFormContent />
      </Formik>

      <h3 className="text-center text-text text-2xl mb-3">
        {t('auth.orYouCan')}
      </h3>

      <button
        type="button"
        className="flex justify-center items-center w-full bg-white hover:bg-slate-200 rounded-xl py-1 px-5"
        onClick={handleSignInWith('google')}
      >
        <GoogleOutlined className="text-xl" />

        <span className="ml-2">
          Sign in with Google
        </span>
      </button>
    </MainLayout>
  );
};

export default SignIn;
