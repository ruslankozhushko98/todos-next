import '@/styles/globals.scss';
import type { AppProps } from 'next/app';
import NextNProgress from 'nextjs-progressbar';

export default function App({ Component, pageProps }: AppProps) {
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
