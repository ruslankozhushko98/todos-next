import '@/styles/globals.scss';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import type { AppProps } from 'next/app';
import NextNProgress from 'nextjs-progressbar';

import '@/libs/config/i18n';

export default function App({ Component, pageProps }: AppProps) {
  const { i18n } = useTranslation();

  useEffect(() => {
    i18n.changeLanguage(localStorage.getItem('lang') ?? 'en');
  }, []);

  return (
    <>
      <NextNProgress
        height={3}
        startPosition={0.3}
        stopDelayMs={200}
        color="#29D"
      />

      <Component {...pageProps} />
    </>
  );
}
