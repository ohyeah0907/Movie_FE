import React from 'react';
import { clsx } from 'clsx';
import styles from './css/item.module.scss';
import { memo } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { icon } from '@fortawesome/fontawesome-svg-core/import.macro';
import { API } from '../../../constant/api-moviedb/API';
import { Link } from 'react-router-dom';
import { addToWishlist } from '../../../service/component/userWishList';

export const Item = memo((props) => {
  const { movie, hero = false, layout = 'recommend' } = props;

  const handleAddToWishList = (movieId) => {
    addToWishlist(movieId);
  };
  return (
    <div
      className={clsx(
        styles.item,
        styles[`item--${layout}`],
        hero ? styles[`item--${layout}--hero`] : ''
      )}
    >
      <div className={clsx(styles.item__imageWrapper)}>
        <img
          className={clsx(styles.item__imageWrapper__content)}
          src={API.IMAGE_URL + movie.backdrop_path}
          alt="movie backdrop"
        />
      </div>
      {/* Layout content */}
      <div className={clsx(styles['item__content__overlay'])}>
        <div className={clsx(styles.item__content, 'container')}>
          <div className={clsx(styles['item__content-wrapper'])}>
            {/* Name and Rating */}
            <div className={clsx(styles.item__name)}>{movie.title}</div>
            <p className={clsx(styles['item__rating-wrapper'])}>
              Rating:{' '}
              <span className={styles.item__rating}>{movie.vote_average}</span>
              /10
            </p>
            {/* Genres */}
            <div className={clsx(styles.item__genres)}>
              <FontAwesomeIcon
                icon={icon({ name: 'tag', style: 'solid' })}
                className={clsx(styles.item__genres__text__icon)}
              />
              <div className={clsx(styles['item__genres__text-wrapper'])}>
                {movie.genres.map((genre, index) => (
                  <Link
                    to={{
                      pathname: '/category',
                    }}
                    state={{
                      selectedGenre: genre.name,
                    }}
                    className={clsx(styles.item__genres__text)}
                    key={index}
                  >
                    {genre.name}
                  </Link>
                ))}
              </div>
            </div>
            {/* Overview */}
            <div className={clsx(styles.item__overview)}>
              {movie.overview || 'Phim rat hay'}
            </div>
            <div
              className={clsx(
                'd-flex align-items-center',
                styles['item__button-wrapper']
              )}
            >
              <Link
                className="link"
                to={`/watch/${movie.id}?is-movie=${!!movie.isMovie}`}
              >
                <span
                  className={clsx(
                    'button button--secondary',
                    styles['item__button--play']
                  )}
                >
                  Watch now
                </span>
              </Link>
              <span
                className={clsx(
                  'button button--favourite',
                  styles['item__button--favourite']
                )}
                onClick={() => handleAddToWishList(movie.id)}
              >
                <FontAwesomeIcon icon={['fa-regular', 'fa-heart']} />
                Add to My List
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});
