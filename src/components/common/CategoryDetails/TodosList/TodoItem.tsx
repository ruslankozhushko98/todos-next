import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { Col, List, Row, Typography } from 'antd';
import { CheckOutlined } from '@ant-design/icons';
import classNames from 'classnames';

import { Todo } from '@/models';
import { OptionsDropdown } from './OptionsDropdown';

import classes from './TodoList.module.scss';

interface Props extends Todo {
  onRemove: (todoId: number) => void;
  onEdit: (todoId: number) => void;
}

export const TodoItem: FC<Props> = ({
  id,
  title,
  description,
  isDone,
  onRemove,
  onEdit,
}) => {
  const { t } = useTranslation();

  const handleRemove = (): void => onRemove(id);

  const handleEdit = (): void => onEdit(id);

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
                {description || t('categoryDetails.todoList.noDescriptionMessage')}
              </Typography.Text>
            </div>
          </Row>
        </Col>

        <OptionsDropdown
          onRemove={handleRemove}
          onEdit={handleEdit}
        />
      </Row>
    </List.Item>
  );
};
