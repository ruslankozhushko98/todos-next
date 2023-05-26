import React, { FC, PropsWithChildren, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { Spin } from 'antd';

export const IsAuthMiddleware: FC<PropsWithChildren> = ({ children }) => {
  const { status } = useSession();
  const { replace } = useRouter();

  useEffect(() => {
    if (status === 'unauthenticated') {
      replace('/auth/sign-in');
    }
  }, [status]);

  if (status === 'loading') {
    return <Spin size="large" />;
  }

  return <>{children}</>;
};
