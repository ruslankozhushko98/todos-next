import { FC } from 'react';
import { AppstoreOutlined, MenuOutlined } from '@ant-design/icons';
import classNames from 'classnames';

import { ListViewModes } from '@/libs/utils/constants';

interface Props {
  viewMode: ListViewModes;
  setViewMode: (viewMode: ListViewModes) => void;
}

export const ListViewSwitcher: FC<Props> = ({ viewMode, setViewMode }) => {
  const handleSetListView = (): void => setViewMode(ListViewModes.LIST_VIEW);

  const handleSetGalleryView = (): void => setViewMode(ListViewModes.GALLERY_VIEW);

  return (
    <div className="flex">
      <button
        onClick={handleSetListView}
        className={classNames(
          'px-2',
          'py-1',
          'border-2',
          'border-solid',
          'rounded-lg',
          'cursor-pointer',
          'hover:border-sky-600',
          'first:mr-5', {
            ['bg-sky-600 border-sky-600']: viewMode === ListViewModes.LIST_VIEW,
            ['bg-transparent border-dark32']: viewMode !== ListViewModes.LIST_VIEW,
          }
        )}
      >
        <MenuOutlined className="text-white text-xl" />
      </button>

      <button
        onClick={handleSetGalleryView}
        className={classNames(
          'px-2',
          'py-1',
          'border-2',
          'border-solid',
          'rounded-lg',
          'cursor-pointer',
          'hover:border-sky-600', {
            ['bg-sky-600 border-sky-600']: viewMode === ListViewModes.GALLERY_VIEW,
            ['bg-transparent border-dark32']: viewMode !== ListViewModes.GALLERY_VIEW,
          }
        )}
      >
        <AppstoreOutlined className="text-white text-xl" />
      </button>
    </div>
  );
};
