import { FC, PropsWithChildren } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { Roboto } from 'next/font/google';
import { useRouter } from 'next/router';
import classNames from 'classnames';

import classes from './MainLayout.module.scss';

const roboto = Roboto({
  weight: ['100', '300', '400', '500', '700', '900'],
  subsets: ['latin', 'cyrillic'],
});

interface Props {
  title: string;
}

export const MainLayout: FC<PropsWithChildren<Props>> = ({ children, title }) => {
  const { pathname } = useRouter();

  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>

      <nav className={classNames(roboto.className, classes.nav)}>
        <Link
          href="/"
          className={classNames(classes.link, {
            [classes.linkActive]: pathname === '/',
          })}
        >
          Home
        </Link>

        <Link
          href="/categories"
          className={classNames(classes.link, {
            [classes.linkActive]: pathname === '/categories',
          })}
        >
          Categories
        </Link>

        <Link
          href="/about-us"
          className={classNames(classes.link, {
            [classes.linkActive]: pathname === '/about-us',
          })}
        >
          About Us
        </Link>
      </nav>

      <main className={classNames(roboto.className, classes.main)}>
        {children}
      </main>
    </>
  );
};
