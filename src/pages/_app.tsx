import '@/styles/globals.scss';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import type { AppProps } from 'next/app';
import NextNProgress from 'nextjs-progressbar';
import { Provider } from 'react-redux';

import '@/libs/config/i18n';
import { store } from '@/store';

export default function App({ Component, pageProps }: AppProps) {
  const { i18n } = useTranslation();

  useEffect(() => {
    i18n.changeLanguage(localStorage.getItem('lang') ?? 'en');
  }, []);

  return (
    <Provider store={store}>
      <NextNProgress
        height={3}
        startPosition={0.3}
        stopDelayMs={200}
        color="#29D"
      />

      <Component {...pageProps} />
    </Provider>
  );
}
