import { FC } from 'react';
import { AppstoreOutlined, MenuOutlined } from '@ant-design/icons';
import classNames from 'classnames';

import { ListViewModes } from '@/libs/utils/constants';

import classes from './ListViewSwitcher.module.scss';

interface Props {
  viewMode: ListViewModes;
  setViewMode: (viewMode: ListViewModes) => void;
}

export const ListViewSwitcher: FC<Props> = ({ viewMode, setViewMode }) => {
  const handleSetListView = (): void => setViewMode(ListViewModes.LIST_VIEW);

  const handleSetGalleryView = (): void => setViewMode(ListViewModes.GALLERY_VIEW);

  return (
    <div className={classes.row}>
      <button
        onClick={handleSetListView}
        className={classNames({
          [classes.activeBtn]: viewMode === ListViewModes.LIST_VIEW
        })}
      >
        <MenuOutlined className={classes.icon} />
      </button>

      <button
        onClick={handleSetGalleryView}
        className={classNames({
          [classes.activeBtn]: viewMode === ListViewModes.GALLERY_VIEW
        })}
      >
        <AppstoreOutlined className={classes.icon} />
      </button>
    </div>
  );
};
