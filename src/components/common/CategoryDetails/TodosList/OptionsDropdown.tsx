import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { Dropdown, Typography } from 'antd';
import { EllipsisOutlined, DeleteOutlined, EditOutlined } from '@ant-design/icons';

import classes from './TodoList.module.scss';

interface Props {
  onRemove: () => void;
}

export const OptionsDropdown: FC<Props> = ({ onRemove }) => {
  const { t } = useTranslation();

  return (
    <Dropdown
      menu={{
        items: [
          {
            key: 0,
            label: (
              <Typography.Text className={classes.dropdownActionText}>
                {t('editBtn')}
              </Typography.Text>
            ),
            icon: <EditOutlined className={classes.editIcon} />,
          },
          {
            key: 1,
            label: (
              <Typography.Text className={classes.dropdownActionText}>
                {t('removeBtn')}
              </Typography.Text>
            ),
            icon: <DeleteOutlined className={classes.deleteIcon} />,
            onClick: onRemove,
          },
        ],
        className: classes.dropdownContent,
      }}
      trigger={['click']}
      placement="bottom"
      overlayClassName={classes.overlayDropdown}
    >
      <EllipsisOutlined className={classes.icon} />
    </Dropdown>
  );
};
