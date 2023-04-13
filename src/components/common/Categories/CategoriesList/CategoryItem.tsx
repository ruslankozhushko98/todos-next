import React, { FC } from 'react';
import Link from 'next/link';
import classNames from 'classnames';
import { CheckOutlined, RightOutlined } from '@ant-design/icons';

import { Category } from '@/models';
import { ProgressBar } from './ProgressBar/ProgressBar';

import classes from './CategoriesList.module.scss';

export const CategoryItem: FC<Category> = ({ id, title, description, progress }) => (
  <Link
    key={id}
    href={`/categories/${id}`}
    className={classNames(classes.listItem, {
      [classes.listItemDone]: Number(progress) === 100,
    })}
  >
    <div
      className={classNames(classes.rect, {
        [classes.blueRect]: Number(progress) < 100,
        [classes.successRect]: Number(progress) === 100,
      })}
    >
      {Number(progress) === 100 ? (
        <CheckOutlined className={classes.checkIcon} />
      ) : (
        <div />
      )}
    </div>

    <div className={classes.content}>
      <h3 className={classes.title}>{title}</h3>

      <span
        className={classNames({
          [classes.emptyDescription]: !description,
        })}
      >
        {description || '- - no description - -'}
      </span>
    </div>

    <RightOutlined className={classes.icon} />

    <ProgressBar progress={Number(progress)} />
  </Link>
);
