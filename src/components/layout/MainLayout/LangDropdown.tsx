import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';
import Image from 'next/image';
import { Dropdown, MenuProps, Space, Typography } from 'antd';
import { DownOutlined } from '@ant-design/icons';

import { icons } from '@/libs/utils/constants';

import classes from './MainLayout.module.scss';

export const LangDropdown: FC = () => {
  const { t, i18n } = useTranslation();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleChangeLanguage = async ({ key }: any): Promise<void> => {
    await i18n.changeLanguage(key);
    localStorage.setItem('lang', key);
  };

  const items: MenuProps['items'] = [
    {
      label: (
        <>
          <Image width={16} height={16} src={icons.gbFlag} alt="en" />

          <Typography.Text className={classes.label}>
            English
          </Typography.Text>
        </>
      ),
      className: classes.langItem,
      key: 'en',
      onClick: handleChangeLanguage,
    },
    {
      label: (
        <>
          <Image width={16} height={16} src={icons.ruFlag} alt="ru" />

          <Typography.Text className={classes.label}>
            Русский
          </Typography.Text>
        </>
      ),
      className: classes.langItem,
      key: 'ru',
      onClick: handleChangeLanguage,
    },
  ];

  return (
    <Dropdown
      menu={{
        items,
        className: classes.dropdownContent,
      }}
      trigger={['click']}
      overlayClassName={classes.langDropdown}
    >
      <Space align="center" className={classes.dropdownContent}>
        <Typography.Text className={classes.dropdownTitle}>
          {t('language')}
        </Typography.Text>

        <DownOutlined />
      </Space>
    </Dropdown>
  );
};
