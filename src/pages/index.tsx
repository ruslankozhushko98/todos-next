import Head from 'next/head';

import { MainLayout } from '@/components/layout/MainLayout/MainLayout';

export default function Home() {
  return (
    <MainLayout>
      <Head>
        <title>Home</title>
      </Head>

      <h1>Home</h1>
    </MainLayout>
  );
}
