import { FC, PropsWithChildren } from 'react';
import { useTranslation } from 'react-i18next';
import Head from 'next/head';
import Link from 'next/link';
import { Roboto } from 'next/font/google';
import { useRouter } from 'next/router';
import classNames from 'classnames';
import { Col, Layout, Row } from 'antd';

import { LangDropdown } from './LangDropdown';

import classes from './MainLayout.module.scss';

const { Header } = Layout;

const roboto = Roboto({
  weight: ['100', '300', '400', '500', '700', '900'],
  subsets: ['latin', 'cyrillic'],
});

interface Props {
  title: string;
}

export const MainLayout: FC<PropsWithChildren<Props>> = ({ children, title }) => {
  const { t } = useTranslation();
  const { pathname } = useRouter();

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

          <Col>
            <Link
              href="/about-us"
              className={classNames(classes.link, {
                [classes.linkActive]: pathname === '/about-us',
              })}
            >
              {t('aboutUs.title')}
            </Link>
          </Col>
        </Row>

        <LangDropdown />
      </Header>

      <main className={classNames(roboto.className, classes.main)}>
        <div>
          {children}
        </div>
      </main>
    </>
  );
};
