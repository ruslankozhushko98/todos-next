import '@/styles/globals.scss';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { QueryClientProvider, Hydrate } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import type { AppProps } from 'next/app';
import { SessionProvider } from 'next-auth/react';
import NextNProgress from 'nextjs-progressbar';

import '@/libs/config/i18n';
import { queryClient } from '@/libs/config/queryClient';

export default function App({ Component, pageProps }: AppProps) {
  const { i18n } = useTranslation();

  useEffect(() => {
    i18n.changeLanguage(localStorage.getItem('lang') ?? 'en');
  }, []);

  return (
    <SessionProvider session={pageProps.session}>
      <QueryClientProvider client={queryClient}>
        <Hydrate state={pageProps.dehydratedState}>
          <NextNProgress
            height={3}
            startPosition={0.3}
            stopDelayMs={200}
            color="#29D"
          />

          <Component {...pageProps} />

          <ReactQueryDevtools />
        </Hydrate>
      </QueryClientProvider>
    </SessionProvider>
  );
}
