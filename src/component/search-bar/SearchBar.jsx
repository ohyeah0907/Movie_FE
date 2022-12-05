import clsx from 'clsx';
import React, { useState } from 'react';
import styles from './css/searchBar.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { icon } from '@fortawesome/fontawesome-svg-core/import.macro';

export const SearchBar = (props) => {
  const { getData } = props;
  const [input, setInput] = useState('');
  const getFilmBySearch = (e) => {
    if (e.key == 'Enter')
      fetch({
        url: 'url-backend',
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
  };
  return (
    <div className={clsx(styles['search-bar'])}>
      <input
        value={input}
        className={clsx(styles['search-bar__input-content'])}
        onKeyDown={(e) => {
          getFilmBySearch(e);
        }}
        onChange={(e) => {
          setInput(e.currentTarget.value);
        }}
      />
      <FontAwesomeIcon
        icon={icon({ name: 'xmark', style: 'solid' })}
        onClick={() => {
          setInput('');
        }}
      />
    </div>
  );
};
