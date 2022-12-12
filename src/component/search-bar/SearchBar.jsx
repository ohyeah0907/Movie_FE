import clsx from 'clsx';
import React, { useState } from 'react';
import styles from './css/searchBar.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { icon } from '@fortawesome/fontawesome-svg-core/import.macro';

export const SearchBar = (props) => {
  const { getData } = props;
  const [input, setInput] = useState('');
  const getFilmBySearch = (e) => {
    
  };
  return (
    <div className={clsx(styles['search-bar'])}>
      <FontAwesomeIcon
        className={clsx(
          styles['search-bar__icon'],
          styles['search-bar__icon--search']
        )}
        icon={icon({ name: 'magnifying-glass', style: 'solid' })}
        onClick={() => {
          setInput('');
        }}
      />
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
        className={clsx(
          styles['search-bar__icon'],
          styles['search-bar__icon--delete']
        )}
        icon={icon({ name: 'xmark', style: 'solid' })}
        onClick={() => {
          setInput('');
        }}
      />
    </div>
  );
};
