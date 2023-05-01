import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import en from '@/libs/translations/en.json';
import ru from '@/libs/translations/ru.json';

i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: {
        translation: en,
      },
      ru: {
        translation: ru,
      },
    },
    lng: 'en',
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
  });
