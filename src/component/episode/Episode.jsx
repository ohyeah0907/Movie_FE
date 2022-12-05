import React, { memo } from 'react';
import styles from './css/episode.module.css';
import clsx from 'clsx';
import { API } from '../../constant/api-moviedb/API';

/* Episode nhận tham số bao gồm episode_number, name, overview, image(still_path), runtime */
// const episode = {
//   number: 1,
//   name: 'The Heirs of the Dragon',
//   overview:
//     'Viserys hosts a tournament to celebrate the birth of his second child. Rhaenyra welcomes her uncle Daemon back to the Red Keep.',
//   image: 'https://image.tmdb.org/t/p/original/3oumSnkavc4pcMFvPbgWDUTclNb.jpg',
//   time: 66,
// };

export const Episode = memo(({ episode }) => {
  const { episode_number, name, overview, runtime, still_path } = episode;
  return (
    <div className={clsx(styles.episode__wrapper)}>
      <div className={clsx(styles.episode__wrapper__number)}>
        {episode_number}
      </div>
      <div className={clsx(styles.episode__wrapper__image)}>
        <img alt="episode" src={API.IMAGE_URL + still_path} />
      </div>
      <div className={clsx(styles.episode__wrapper__content)}>
        <div className={clsx(styles.episode__wrapper__content__heading)}>
          <div
            className={clsx(styles.episode__wrapper__content__heading__name)}
          >
            {name}
          </div>
          <div
            className={clsx(styles.episode__wrapper__content__heading__time)}
          >
            {runtime}m
          </div>
        </div>
        <div className={clsx(styles.episode__wrapper__content__overview)}>
          {overview}
        </div>
      </div>
    </div>
  );
});
