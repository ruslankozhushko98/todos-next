import { useTranslation } from 'react-i18next';

import { MainLayout } from '@/components/layout/MainLayout/MainLayout';

export default function Home() {
  const { t } = useTranslation();

  return (
    <MainLayout title={t('home.title')}>
      <h1 className="text-text text-2xl">Home</h1>
    </MainLayout>
  );
}
