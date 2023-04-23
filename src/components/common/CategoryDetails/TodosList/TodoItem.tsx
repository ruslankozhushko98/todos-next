import React, { FC } from 'react';
import { List, Row, Typography } from 'antd';

import { Todo } from '@/models';

import classes from './TodoList.module.scss';

export const TodoItem: FC<Todo> = ({ id, title, description, isDone }) => {
  return (
    <List.Item className={classes.listItem}>
      <Typography.Title level={4} className={classes.title}>
        {title}
      </Typography.Title>

      <Typography.Text className={classes.description}>
        {description || '- - no description - -'}
      </Typography.Text>
    </List.Item>
  );
};
