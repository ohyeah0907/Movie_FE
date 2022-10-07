import React from 'react';
import { clsx } from 'clsx';
import styles from './css/item.module.scss';
import { memo } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { icon } from '@fortawesome/fontawesome-svg-core/import.macro';

export const Item = memo((props) => {
  const {
    movie,
    showName = true,
    showStar = true,
    showRating = true,
    showOverview = false,
    showGenres = true,
    layoutSecond = false,
  } = props;
  return (
    <div className={clsx(styles.item)}>
      {/* Image */}
      <div
        className={clsx({
          [styles.item__imageWrapper]: !layoutSecond,
          [styles.item__imageWrapperSecond]: layoutSecond,
        })}
      >
        <img
          className={clsx(styles.item__imageWrapper__content)}
          src={layoutSecond ? movie.backdrop : movie.poster}
          alt="movie"
        />
      </div>
      {/* Layout content */}
      <div
        className={clsx({
          [styles.item__layoutContent]: !layoutSecond,
          [styles.item__layoutContentSecond]: layoutSecond,
        })}
      >
        {/* Rating */}
        <p
          className={clsx({
            [styles.displayNone]: !showRating,
            [styles.item__layoutContent__rating]: showRating,
            [styles.item__layoutContentSecond__rating]: layoutSecond,
          })}
        >
          {movie.rating}
        </p>
        {/* Star */}
        <div
          className={clsx({
            [styles.displayNone]: !showStar,
            [styles.item__layoutContent__star]: showStar,
          })}
        >
          <FontAwesomeIcon icon={icon({ name: 'star', style: 'solid' })} />
          <FontAwesomeIcon icon={icon({ name: 'star', style: 'solid' })} />
          <FontAwesomeIcon icon={icon({ name: 'star', style: 'solid' })} />
          <FontAwesomeIcon icon={icon({ name: 'star', style: 'solid' })} />
          <FontAwesomeIcon icon={icon({ name: 'star', style: 'solid' })} />
          <div className={clsx(styles.item__layoutContent__star__inner)}>
            <div
              className={clsx(styles.item__layoutContent__star__inner__content)}
            >
              <FontAwesomeIcon icon={icon({ name: 'star', style: 'solid' })} />
              <FontAwesomeIcon icon={icon({ name: 'star', style: 'solid' })} />
              <FontAwesomeIcon icon={icon({ name: 'star', style: 'solid' })} />
              <FontAwesomeIcon icon={icon({ name: 'star', style: 'solid' })} />
              <FontAwesomeIcon icon={icon({ name: 'star', style: 'solid' })} />
            </div>
          </div>
        </div>
        {/* Name */}
        <div
          className={clsx({
            [styles.displayNone]: !showName,
            [styles.item__layoutContent__name]: showName,
          })}
        >
          {movie.name}
        </div>
        {/* Genres */}
        <div
          className={clsx({
            [styles.displayNone]: !showGenres,
            [styles.item__layoutContent__genres]: showGenres,
          })}
        >
          {movie.genres.map((genres, index) => (
            <a
              href="/"
              className={clsx(styles.item__layoutContent__genres__text)}
              key={index}
            >
              <FontAwesomeIcon
                icon={icon({ name: 'tag', style: 'solid' })}
                className={clsx(styles.item__layoutContent__genres__text__icon)}
              />
              {genres}
            </a>
          ))}
        </div>
        {/* Overview */}
        <div
          className={clsx({
            [styles.displayNone]: !showOverview,
            [styles.item__layoutContent__overview]: showOverview,
            [styles.item__layoutContentSecond__overview]: layoutSecond,
          })}
        >
          {movie.overview}
        </div>
      </div>
    </div>
  );
});
