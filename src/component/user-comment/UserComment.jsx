import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { icon } from '@fortawesome/fontawesome-svg-core/import.macro';
import clsx from 'clsx';
import React from 'react';
import styles from './css/user-comment.module.css';

const option = {
  year: 'numeric',
  month: 'numeric',
  day: 'numeric',
};

export const UserComment = ({ info, pos, currentUser }) => {
  const { user, content, time, id, deleteComment } = info;
  console.log(currentUser);
  return (
    <div className={clsx(styles.userComment)}>
      <div className={clsx(styles.userComment__avatar)}>
        <FontAwesomeIcon icon={icon({ name: 'user', style: 'solid' })} />
      </div>
      <div className={clsx(styles.userComment__info)}>
        <div className={clsx(styles.userComment__info__heading)}>
          <div className={clsx(styles.userComment__info__heading__name)}>
            {user}
          </div>
          <div className={clsx(styles.userComment__info__heading__date)}>
            {new Date(time).toLocaleDateString('vi', option)}
          </div>
        </div>
        <div className={clsx(styles.userComment__info__content)}>{content}</div>
        {currentUser == user && (
          <button
            className={clsx(styles['button'], styles['button--delete'])}
            onClick={() => {
              deleteComment(pos, id);
            }}
          >
            <FontAwesomeIcon icon={icon({ name: 'xmark', style: 'solid' })} />
            Delete
          </button>
        )}
      </div>
    </div>
  );
};
