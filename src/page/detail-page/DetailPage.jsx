import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { icon } from '@fortawesome/fontawesome-svg-core/import.macro';
import clsx from 'clsx';
import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import styles from './css/detail-page.module.css';
import ReactDOM from 'react-dom';
import { faHandsBubbles } from '@fortawesome/free-solid-svg-icons';

const movie = {
  name: 'House of the Dragon',
  poster: 'https://image.tmdb.org/t/p/original/z2yahl2uefxDCl0nogcRBstwruJ.jpg',
  backdrop:
    'https://image.tmdb.org/t/p/original/etj8E2o0Bud0HkONVQPjyCkIvpv.jpg',
  rating: 5,
  star: 5,
  genres: ['action', 'adventure'],
  overview:
    'The Targaryen dynasty is at the absolute apex of its power, with more than 15 dragons under their yoke. Most empires crumble from such heights. In the case of the Targaryens, their slow fall begins when King Viserys breaks with a century of tradition by naming his daughter Rhaenyra heir to the Iron Throne. But when Viserys later fathers a son, the court is shocked when Rhaenyra retains her status as his heir, and seeds of division sow friction across the realm.',
  id: 1,
};

export const DetailPage = () => {
  return (
    <Container fluid className={clsx(styles.detailPage)}>
      <div
        className={clsx(styles.detailPage__background)}
        style={{ backgroundImage: `url(${movie.backdrop})` }}
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
                  {movie.rating}
                </div>
                <img src={movie.poster} />
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
                  {movie.name}
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
                  {movie.genres ? (
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
                          {genres}
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
                  {movie.overview}
                </div>
                <div
                  className={clsx(
                    styles.detailPage__wrapper__generalInfo__content__button
                  )}
                >
                  <a
                    href="#"
                    className={clsx(styles.buttonWatch)}
                    onMouseOver={(event) => {}}
                  >
                    Watch
                  </a>
                </div>
              </div>
            </Col>
          </Row>
        </div>
      </Container>
    </Container>
  );
};
