import React, { useEffect, useLayoutEffect } from 'react';
import clsx from 'clsx';
import styles from './css/search-page.module.scss';
import { NormalItem as Item } from '../../component/item';
import { Row, Col } from 'react-bootstrap';
import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { getFilmByName } from '../../service/search-page/SearchPageService';

export const SearchPage = () => {
  const [searchParam, setSearchParam] = useSearchParams();
  const [userMovies, setUserMovies] = useState([]);
  const controller = new AbortController();

  useLayoutEffect(() => {
    handleSearchFilm(searchParam.get('name'), controller.signal);
    return () => controller.abort();
  }, [searchParam]);

  const handleSearchFilm = async (name, signal) => {
    const filmList = await getFilmByName(name, signal).then((res) => res.data);
    console.log(filmList);
    setUserMovies(filmList);
  };

  return (
    <div className={clsx('section')}>
      <div className="container">
        <div className={clsx(styles['section__heading'])}>
          <div className={clsx(styles['section__title'])}>Result</div>
          <div className={clsx(styles['section__paragraph'])}>
            {userMovies.length == 0
              ? 'There are no matching results'
              : 'Here are your search result'}
          </div>
        </div>
        <div className="row gx-3 gy-4">
          {userMovies.map((movie) => (
            <Col md={2} sm={3}>
              <Item movie={movie} layout="normal-home"></Item>
            </Col>
          ))}
        </div>
      </div>
    </div>
  );
};
