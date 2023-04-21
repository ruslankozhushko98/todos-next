import React, { FC } from 'react';
import Link from 'next/link';
import classNames from 'classnames';
import { Typography } from 'antd';
import { CheckOutlined, RightOutlined } from '@ant-design/icons';

import { ListViewModes } from '@/libs/utils/constants';
import { Category } from '@/models';
import { ProgressBar } from '@/components/common/Categories/ProgressBar/ProgressBar';

import classes from './CategoriesList.module.scss';

interface Props extends Category {
  listViewMode: ListViewModes;
}

export const CategoryItem: FC<Props> = ({ id, title, description, progress, listViewMode }) => (
  <Link
    href={`/categories/${id}`}
    className={classNames(classes.listItem, {
      [classes.listItemDone]: Number(progress) === 100,
      [classes.listItemGrid]: listViewMode === ListViewModes.GALLERY_VIEW,
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
      <Typography.Title level={4} className={classes.title}>
        {title}
      </Typography.Title>

      <Typography.Text italic={!description} className={classes.description}>
        {description || '- - no description - -'}
      </Typography.Text>

      <ProgressBar progress={Number(progress)} />
    </div>

    <RightOutlined className={classes.icon} />
  </Link>
);
