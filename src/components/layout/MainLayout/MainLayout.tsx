import { FC, PropsWithChildren, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import Head from 'next/head';
import Link from 'next/link';
import { Roboto } from 'next/font/google';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';
import classNames from 'classnames';
import { Col, Layout, Row } from 'antd';

import { UserDropdown } from '@/components/layout/UserDropdown/UserDropdown';

import classes from './MainLayout.module.scss';

const { Header } = Layout;

const roboto = Roboto({
  weight: ['100', '300', '400', '500', '700', '900'],
  subsets: ['latin', 'cyrillic'],
});

interface Props {
  title: string;
  className?: string;
}

export const MainLayout: FC<PropsWithChildren<Props>> = ({ children, title, className }) => {
  const { t } = useTranslation();
  const { pathname } = useRouter();
  const { status } = useSession();

  const isAuthenticated: boolean = useMemo(() => {
    return status === 'authenticated';
  }, [status]);

  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>

      <Header className={classNames(roboto.className, classes.nav)}>
        <Row gutter={40} justify="space-between" wrap>
          <Col>
            <Link
              href="/"
              className={classNames(classes.link, {
                [classes.linkActive]: pathname === '/',
              })}
            >
              {t('home.title')}
            </Link>
          </Col>

          {isAuthenticated && (
            <Col>
              <Link
                href="/categories"
                className={classNames(classes.link, {
                  [classes.linkActive]: pathname.match('/categories'),
                })}
              >
                {t('categories.title')}
              </Link>
            </Col>
          )}
        </Row>

        {isAuthenticated ? (
          <UserDropdown />
        ) : (
          <Link
            href="/auth/sign-in"
            className={classes.link}
          >
            {t('auth.signIn.signInBtn')}
          </Link>
        )}
      </Header>

      <main className={classNames(roboto.className, classes.main, className)}>
        <div>
          {children}
        </div>
      </main>
    </>
  );
};
