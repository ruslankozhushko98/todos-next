import { NextPage } from 'next';
import { useTranslation } from 'react-i18next';

import { MainLayout } from '@/components/layout/MainLayout/MainLayout';

const AboutUs: NextPage = () => {
  const { t } = useTranslation();

  return (
    <MainLayout title={t('aboutUs.title')}>
      <h1>About Us</h1>
    </MainLayout>
  );
};
 
export default AboutUs;
