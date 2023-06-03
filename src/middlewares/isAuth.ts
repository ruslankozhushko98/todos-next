import { GetServerSidePropsContext, PreviewData } from 'next';
import { getSession } from 'next-auth/react';
import { ParsedUrlQuery } from 'querystring';

export const isAuth = async (context: GetServerSidePropsContext<ParsedUrlQuery, PreviewData>) => {
  const session = await getSession(context);

  if (!session) {
    return {
      redirect: {
        destination: '/auth/sign-in',
        permanent: false,
      },
    };
  }
};
