import clsx from 'clsx';
import React, { useEffect, useState } from 'react';
import styles from './css/HomePage.module.scss';
import { movieList } from '../../component/testdata';
import { Item } from '../../component/item/Item';
import { Col, Row } from 'react-bootstrap';
import { useMemo } from 'react';

export const HomePage = () => {
  const featureList = movieList.filter((movie, index) => {
    return movie.rating > 50 && index < 4 ? movie : undefined;
  });

  const randomHerroList = () => {
    const randomList = [];
    while (randomList.length < 3) {
      const randomIndex = Math.floor(Math.random() * movieList.length);
      if (randomList.includes(randomIndex) === false) {
        randomList.push(movieList[randomIndex]);
      } else {
        console.log('trung hop');
      }
    }
    return randomList;
  };
  let random = randomHerroList();

  return (
    <div className="home">
      <div className={styles.section__hero}>
        <div className={clsx('row h-100 gx-0', styles.hero__content)}>
          <Col lg={8} sm={12}>
            <Item movie={random[0]} layout="recommend-hero-xl" />
          </Col>
          <Col lg={4} sm={12}>
            <div className="row gx-0 h-50">
              <Item movie={random[1]} layout="recommend-hero-md" />
            </div>
            <div className="row gx-0 h-50">
              <Item movie={random[2]} layout="recommend-hero-md" />
            </div>
          </Col>
        </div>
      </div>
      <div className={clsx('section', styles['section__highlight'])}>
        <div className="container">
          <div className={clsx(styles['section__heading'])}>
            <div className={clsx(styles['section__title'])}>Highlights</div>
            <div className={clsx(styles['section__paragraph'])}>
              Be sure not to miss these movies today.
            </div>
          </div>
          <div
            className={clsx(
              'row',
              styles['section__content'],
              styles['movie__feature-list']
            )}
          >
            {featureList.map((movie, index) => (
              <div
                className={clsx(
                  'col-md-3 col-6',
                  styles['movie__feature-item']
                )}
                key={index}
              >
                <Item movie={movie} layout="feature"></Item>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className={clsx('section', styles.section__recommend)}>
        <Item movie={movieList[0]} layout="recommend"></Item>
      </div>
      <div className={clsx('section', styles['section__new'])}>
        <div className="container">
          <div className={clsx(styles['section__heading'])}>
            <div className={clsx(styles['section__title'])}>New Releases</div>
            <div className={clsx(styles['section__paragraph'])}>
              Our most recently released movies.
            </div>
          </div>
          <div className={clsx(styles.section__content, styles.movie__new)}>
            <div className={clsx('row', styles['section__content-wrapper'])}>
              <Col className={styles['movie__list-alt']}>
                <div className="row gx-2 gy-3">
                  {movieList.map((movie, index) => (
                    <Col lg={2} xs={4} key={index}>
                      <Item movie={movie} layout="normal-home" />
                    </Col>
                  ))}
                </div>
              </Col>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
