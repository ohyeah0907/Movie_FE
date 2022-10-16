import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { icon } from '@fortawesome/fontawesome-svg-core/import.macro';
import clsx from 'clsx';
import React, { useEffect, useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import styles from './css/detail-page.module.css';
import {
  getDetailMovie,
  getDetailMovieVideo,
} from '../../service/detail-page/DetailPageService';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { Movie } from '../../model/Movie';

/* Trang Detail page sẽ nhận object có thuộc tính id và isMovie, isMovie để kiểm tra xem id vừa nhận
là của TV series hay Movie */

export const DetailPage = () => {
  const { movieId } = useParams();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [movie, setMovie] = useState({});

  useEffect(() => {
    getDataFirstTime();
  }, []);
  const getDataFirstTime = async () => {
    let isMovie;
    if (
      searchParams.get('is-movie') === null ||
      (searchParams.get('is-movie') !== 'true' &&
        searchParams.get('is-movie') !== 'false')
    )
      navigate(-1);
    else isMovie = searchParams.get('is-movie');

    if (isMovie === 'true') {
      const {
        id,
        title,
        poster_path,
        backdrop_path,
        vote_average,
        popularity,
        genres,
        overview,
      } = await getDetailMovie(movieId)
        .then((data) => data)
        .catch((error) => navigate('/error'), { replace: true });
      const trailer = await getDetailMovieVideo(movieId)
        .then((data) => data.results[0].key)
        .catch((error) => navigate('/error'));

      const movie = new Movie(
        id,
        title,
        poster_path,
        backdrop_path,
        vote_average,
        popularity,
        genres,
        overview,
        trailer
      );
      setMovie(movie);
    }
  };

  return (
    <Container fluid className={clsx(styles.detailPage)}>
      <div
        className={clsx(styles.detailPage__background)}
        style={{ backgroundImage: `url(${movie?.backdrop})` }}
      ></div>
      <Container className={clsx(styles.detailPage__wrapper)}>
        {/* Movie general infomation */}
        <div className={clsx(styles.detailPage__wrapper__generalInfo)}>
          <Row xl={12} lg={12}>
            <Col xl={4} lg={12}>
              <div
                className={clsx(styles.detailPage__wrapper__generalInfo__image)}
              >
                <div
                  className={clsx(
                    styles.detailPage__wrapper__generalInfo__image__rating
                  )}
                >
                  {movie?.rating ? Math.floor(movie.rating) : false}
                </div>
                <img src={movie.poster} alt="movie" />
              </div>
            </Col>
            <Col xl={8} lg={12}>
              <div
                className={clsx(
                  styles.detailPage__wrapper__generalInfo__content
                )}
              >
                {/* Movie's name */}
                <p
                  className={clsx(
                    styles.detailPage__wrapper__generalInfo__content__name
                  )}
                >
                  {movie?.name}
                </p>
                {/* Star and genres */}
                <div
                  className={clsx(
                    styles.detailPage__wrapper__generalInfo__content__starGenres
                  )}
                >
                  <div className={clsx(styles.star)}>
                    <FontAwesomeIcon
                      icon={icon({ name: 'star', style: 'solid' })}
                    />
                    <FontAwesomeIcon
                      icon={icon({ name: 'star', style: 'solid' })}
                    />
                    <FontAwesomeIcon
                      icon={icon({ name: 'star', style: 'solid' })}
                    />
                    <FontAwesomeIcon
                      icon={icon({ name: 'star', style: 'solid' })}
                    />
                    <FontAwesomeIcon
                      icon={icon({ name: 'star', style: 'solid' })}
                    />
                    <div className={clsx(styles.star__inner)}>
                      <div className={clsx(styles.star__inner__content)}>
                        <FontAwesomeIcon
                          icon={icon({ name: 'star', style: 'solid' })}
                        />
                        <FontAwesomeIcon
                          icon={icon({ name: 'star', style: 'solid' })}
                        />
                        <FontAwesomeIcon
                          icon={icon({ name: 'star', style: 'solid' })}
                        />
                        <FontAwesomeIcon
                          icon={icon({ name: 'star', style: 'solid' })}
                        />
                        <FontAwesomeIcon
                          icon={icon({ name: 'star', style: 'solid' })}
                        />
                      </div>
                    </div>
                  </div>
                  {movie?.genres ? (
                    <div className={clsx(styles.genres)}>
                      {movie.genres.map((genres, index) => (
                        <a
                          href="#"
                          className={clsx(styles.genres__link)}
                          key={index}
                        >
                          <FontAwesomeIcon
                            icon={icon({ name: 'tag', style: 'solid' })}
                            className={clsx(styles.genres__icon)}
                          />
                          {genres.name}
                        </a>
                      ))}
                    </div>
                  ) : (
                    false
                  )}
                </div>
                {/* Overview */}
                <div
                  className={clsx(
                    styles.detailPage__wrapper__generalInfo__content__overview
                  )}
                >
                  {movie?.overview}
                </div>
                <div
                  className={clsx(
                    styles.detailPage__wrapper__generalInfo__content__button
                  )}
                >
                  <a href="#video" className={clsx(styles.buttonWatch)}>
                    Watch
                  </a>
                </div>
              </div>
            </Col>
          </Row>
        </div>

        <div className={clsx(styles.detailPage__wrapper__trailer)}>
          <Row xl={12} lg={12}>
            <Col xl={12} lg={12}>
              <div
                className={clsx(styles.detailPage__wrapper__trailer__content)}
              >
                <div
                  className={clsx(
                    styles.detailPage__wrapper__trailer__content__heading
                  )}
                >
                  Official trailer of this movie
                </div>
                <div
                  className={clsx(
                    styles.detailPage__wrapper__trailer__content__video
                  )}
                  id="video"
                >
                  <iframe src={movie.trailer} title="trailer"></iframe>
                </div>
              </div>
            </Col>
          </Row>
        </div>
      </Container>
    </Container>
  );
};
