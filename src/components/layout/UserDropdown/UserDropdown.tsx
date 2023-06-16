import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { useSession, signOut } from 'next-auth/react';
import Image from 'next/image';
import { Dropdown, MenuProps, Row, Typography } from 'antd';
import { DownOutlined, UserOutlined } from '@ant-design/icons';

import { icons } from '@/libs/utils/constants';

import classes from './UserDropdown.module.scss';

export const UserDropdown: FC = () => {
  const { t, i18n } = useTranslation();
  const { data } = useSession();

  const handleChangeLanguage = async ({ key }: any): Promise<void> => {
    await i18n.changeLanguage(key);
    localStorage.setItem('lang', key);
  };

  const items: MenuProps['items'] = [
    {
      label: (
        <Row align="middle" className={classes.dropdownContent}>
          <Image
            width={16}
            height={16}
            src={i18n.language === 'ru' ? icons.ruFlag : icons.gbFlag}
            alt="en"
          />

          <Typography.Text className={classes.dropdownTitle}>
            {t('language')}
          </Typography.Text>

          <DownOutlined className={classes.arrowDownIcon} />
        </Row>
      ),
      children: [
        {
          key: 'en',
          label: (
            <Row align="middle">
              <Image width={16} height={16} src={icons.gbFlag} alt="en" />

              <Typography.Text className={classes.label}>
                English
              </Typography.Text>
            </Row>
          ),
          onClick: handleChangeLanguage,
        },
        {
          key: 'ru',
          label: (
            <Row align="middle">
              <Image width={16} height={16} src={icons.ruFlag} alt="ru" />

              <Typography.Text className={classes.label}>
                Русский
              </Typography.Text>
            </Row>
          ),
          onClick: handleChangeLanguage,
        },
      ],
      key: 'lang',
      popupClassName: classes.popup,
    },
    {
      label: (
        <Typography.Text className={classes.dropdownTitle}>
          {t('auth.signOut')}
        </Typography.Text>
      ),
      onClick: () => signOut({
        redirect: true,
        callbackUrl: '/auth/sign-in',
      }),
      key: 'sign-out',
    },
  ];

  return (
    <Dropdown
      menu={{
        items,
        className: classes.dropdownContent,
      }}
      trigger={['click']}
      overlayClassName={classes.overlayDropdown}
      className={classes.dropdown}
    >
      <Row align="middle" className={classes.dropdownContent}>
        {data?.user?.image ? (
          <img
            width={40}
            height={40}
            src={String(data?.user?.image)}
            alt="avatar"
            className={classes.avatar}
          />
        ) : (
          <UserOutlined className={classes.userIcon} />
        )}

        <Typography.Text className={classes.dropdownTitle}>
          {t('hey')}, {data?.user?.name?.split(' ')[0]}
        </Typography.Text>

        <DownOutlined className={classes.arrowDownIcon} />
      </Row>
    </Dropdown>
  );
};
