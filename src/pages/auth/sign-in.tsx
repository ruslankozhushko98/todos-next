import { NextPage } from 'next';
import { signIn } from 'next-auth/react';
import { useTranslation } from 'react-i18next';
import { GoogleOutlined } from '@ant-design/icons';

import { MainLayout } from '@/components/layout/MainLayout/MainLayout';

const SignIn: NextPage = () => {
  const { t } = useTranslation();

  const handleSignInWith = (provider: string) => async () => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const res = await signIn(provider, {
      redirect: true,
      callbackUrl: '/categories',
    });
  };

  return (
    <MainLayout title={t('auth.signIn.title')} className="w-3/6 mx-auto">
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
