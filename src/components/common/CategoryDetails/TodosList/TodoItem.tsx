import React, { FC } from 'react';
import { Col, List, Row, Typography } from 'antd';
import { CheckOutlined } from '@ant-design/icons';
import classNames from 'classnames';

import { Todo } from '@/models';
import { OptionsDropdown } from './OptionsDropdown';

import classes from './TodoList.module.scss';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const TodoItem: FC<Todo> = ({ id, title, description, isDone }) => {
  return (
    <List.Item>
      <Row justify="space-between" align="middle" className={classes.listItem}>
        <Col className={classes.right}>
          <Row align="middle">
            <div
              className={classNames(classes.rect, {
                [classes.blueRect]: !isDone,
                [classes.successRect]: isDone,
              })}
            >
              {isDone ? (
                <CheckOutlined className={classes.checkIcon} />
              ) : (
                <div />
              )}
            </div>

            <div className={classes.content}>
              <Typography.Title level={4} className={classes.title}>
                {title}
              </Typography.Title>

              <Typography.Text italic className={classes.description}>
                {description || '- - no description - -'}
              </Typography.Text>
            </div>
          </Row>
        </Col>

        <OptionsDropdown />
      </Row>
    </List.Item>
  );
};
