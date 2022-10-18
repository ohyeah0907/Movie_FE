import React, { memo, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { icon } from '@fortawesome/fontawesome-svg-core/import.macro';
import clsx from 'clsx';
import styles from './css/season-dropbox.module.css';

export const SeasonDropBox = memo(({ season, seasons, handleClick }) => {
  const [toggle, setToggle] = useState(false);
  const listSeason = [];
  for (let index = 0; index < seasons; index++) {
    listSeason.push(
      <li
        value={index + 1}
        onClick={(e) => {
          console.log(e.target.value);
          handleClick(e.target.value);
        }}
        className={clsx(styles.dropbox__list__item)}
        key={index}
      >{`Season ${index + 1}`}</li>
    );
  }

  return (
    <div className={clsx(styles.dropbox)}>
      <div className={clsx(styles.dropbox__selected)}>
        <input value={`Season ${season}`} disabled />
        <span
          className={clsx(styles.dropbox__selected__icon)}
          onClick={() => {
            setToggle(!toggle);
          }}
        >
          <FontAwesomeIcon
            icon={icon({ name: 'caret-down', style: 'solid' })}
          />
        </span>
      </div>
      <ul
        className={clsx(styles.dropbox__list, { [styles.showDropBox]: toggle })}
      >
        {listSeason}
      </ul>
    </div>
  );
});
