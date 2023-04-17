import React, { ChangeEvent, FC } from 'react';
import { SearchOutlined } from '@ant-design/icons';

import classes from './SearchBar.module.scss';

interface Props {
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

export const SearchBar: FC<Props> = ({ value, onChange }) => (
  <div className={classes.searchBarContainer}>
    <input
      className={classes.searchField}
      placeholder="Search"
      type="text"
      value={value}
      onChange={onChange}
    />

    <SearchOutlined className={classes.searchIcon} />
  </div>
);
