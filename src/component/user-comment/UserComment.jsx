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

// const user = {
//   name: 'MrOhyeah',
//   content:
//     'Nice movie Nice movie Nice movie Nice movie Nice movie Nice movie Nice movie Nice movie Nice movieNice movieNice movie Nice movieNice movie Nice movie Nice movie Nice movie Nice movie Nice movie Nice movie ',
//   date: new Date(Date.now()).toLocaleDateString('vi', option),
// };

export const UserComment = ({ user }) => {
  const { user_id, content, date } = user;
  return (
    <div className={clsx(styles.userComment)}>
      <div className={clsx(styles.userComment__avatar)}>
        <FontAwesomeIcon icon={icon({ name: 'user', style: 'solid' })} />
      </div>
      <div className={clsx(styles.userComment__info)}>
        <div className={clsx(styles.userComment__info__heading)}>
          <div className={clsx(styles.userComment__info__heading__name)}>
            {user_id}
          </div>
          <div className={clsx(styles.userComment__info__heading__date)}>
            {new Date(date).toLocaleDateString('vi', option)}
          </div>
        </div>
        <div className={clsx(styles.userComment__info__content)}>{content}</div>
      </div>
    </div>
  );
};
