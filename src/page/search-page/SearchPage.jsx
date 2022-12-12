import React, { useEffect } from 'react';
import clsx from 'clsx';
import styles from './css/search-page.module.scss';
import { NormalItem as Item } from '../../component/item';
import { Row, Col } from 'react-bootstrap';
import { useState } from 'react';

export const SearchPage = () => {
  const [userMovies, setUserMovies] = useState([]);
  const controller = new AbortController();
  const token = localStorage.getItem('access_token');

  useEffect(() => {}, []);

  return (
    <div className={clsx('section')}>
      <div className="container">
        <div className={clsx(styles['section__heading'])}>
          <div className={clsx(styles['section__title'])}>Result</div>
          <div className={clsx(styles['section__paragraph'])}>
            Here are your search result
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
