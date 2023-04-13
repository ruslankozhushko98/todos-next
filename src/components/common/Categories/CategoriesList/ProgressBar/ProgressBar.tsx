import React, { FC } from 'react';
import classNames from 'classnames';

import classes from './ProgressBar.module.scss';

interface Props {
  progress: number;
}

export const ProgressBar: FC<Props> = ({ progress }) => (
  <div className={classes.container}>
    <div className={classes.lineWrapper}>
      <div
        style={{ width: `${progress}%` }}
        className={classNames(classes.line, {
          [classes.lineInProgress]: progress < 100,
          [classes.lineDone]: progress === 100,
        })}
      />
    </div>

    <span>{progress}%</span>
  </div>
);
