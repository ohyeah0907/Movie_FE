import React, { useEffect } from 'react';
import clsx from 'clsx';
import styles from './ListPage.module.scss';
import { DefaultSlider as Slider } from '../../component/slider/Default';
import { NormalItem as Item } from '../../component/item';
import { getAllMovie } from '../../service/component/movie';
import { Row, Col } from 'react-bootstrap';
import { useState } from 'react';
import { addToWishlist } from '../../service/list-page/List';

export const ListPage = () => {
  const [userMovies, setUserMovies] = useState([]);
  const controller = new AbortController();

  useEffect(() => {
    // let getData = async () => {
    //   let data = await getAllMovie(controller.signal);
    //   let dataFiltered = data.filter(
    //     (item) => item.title !== null && item.overview.length > 0
    //   );
    //   setUserMovies(dataFiltered);
    // };
    // getData().catch(console.error);
    addToWishlist(760161, controller.signal);
    return () => controller.abort();
  }, []);

  return (
    <div className={clsx('section')}>
      <div className="container">
        <div className={clsx(styles['section__heading'])}>
          <div className={clsx(styles['section__title'])}>
            My Favourite Movie List
          </div>
          <div className={clsx(styles['section__paragraph'])}>
            Here are your beloved movies.
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
