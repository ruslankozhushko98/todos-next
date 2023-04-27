import React, { FC } from 'react';
import { Dropdown } from 'antd';
import { EllipsisOutlined, DeleteOutlined, EditOutlined } from '@ant-design/icons';

import classes from './TodoList.module.scss';

export const OptionsDropdown: FC = () => (
  <Dropdown
    menu={{
      items: [
        {
          key: 0,
          label: 'Edit',
          icon: <EditOutlined className={classes.editIcon} />,
        },
        {
          key: 1,
          label: 'Remove',
          icon: <DeleteOutlined className={classes.deleteIcon} />,
        },
      ],
    }}
    trigger={['click']}
    placement="bottomRight"
  >
    <EllipsisOutlined className={classes.icon} />
  </Dropdown>
);
