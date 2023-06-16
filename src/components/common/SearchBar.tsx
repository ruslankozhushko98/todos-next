import React, { ChangeEvent, FC } from 'react';
import { useTranslation } from 'react-i18next';
import { SearchOutlined } from '@ant-design/icons';

interface Props {
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

export const SearchBar: FC<Props> = ({ value, onChange }) => {
  const { t } = useTranslation();

  return (
    <div className="relative w-fit">
      <input
        className="bg-dark32 border-1 border-solid border-dark4 rounded-3xl py-2.5 px-3 text-text w-64 text-base"
        placeholder={t('search').toString()}
        type="text"
        value={value}
        onChange={onChange}
      />

      <SearchOutlined className="text-white absolute top-3.5 right-4" />
    </div>
  );
};
