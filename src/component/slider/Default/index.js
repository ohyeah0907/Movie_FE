import { Swiper, SwiperSlide } from 'swiper/react';
import { useState, useEffect, useRef } from 'react';
import styles from './Slider.module.scss';
import { NormalItem as Item } from '../../item';
import { Autoplay, Thumbs, Pagination } from 'swiper';
import { getAllMovie } from '../../../service/component/movie';
import { API } from '../../../constant/api-moviedb/API';
import clsx from 'clsx';
import 'swiper/css';
import 'swiper/css/pagination';

export const DefaultSlider = (props) => {
  const { layout = 'normal', category = null, sortDate = false } = props;
  const [itemList, setItemList] = useState([]);
  const paginationSwiperRef = useRef();
  const controller = new AbortController();

  useEffect(() => {
    let filteringData = async () => {
      let data = await getAllMovie(controller.signal);
      let dataFiltered = data.data.filter((value) => value.title !== null);
      if (sortDate) {
        let moviesWithDateFiltered = [...dataFiltered]
          .filter((movie) => movie.release_date !== null)
          .sort((movie1, movie2) => {
            let date1 = new Date(movie1.release_date);
            let date2 = new Date(movie2.release_date);
            return date2 - date1;
          });
        dataFiltered = [...moviesWithDateFiltered];
      }

      if (category) {
        let categoryFiltered = [...dataFiltered].filter((movie) => {
          return movie.genres.some((genre) => genre.name === category);
        });
        if (categoryFiltered.length > 0) dataFiltered = [...categoryFiltered];
      }

      setItemList(dataFiltered);
      if (itemList.length > 0) console.log(itemList);
    };
    filteringData().catch(console.error);
  }, []);

  const handleSwipeNext = () => {
    paginationSwiperRef.current?.slideNext();
  };

  const handleSwipePrevious = () => {
    paginationSwiperRef.current?.slidePrev();
  };
  return (
    <>
      <Swiper
        className={clsx(styles.slider, styles[`slider--${layout}`])}
        slidesPerGroup={1}
        speed={1000}
        spaceBetween={6}
        slidesPerView={6}
        onBeforeInit={(swiper) => {
          paginationSwiperRef.current = swiper;
        }}
      >
        {itemList.map((movie) => (
          <SwiperSlide key={movie.id}>
            <Item movie={movie} layout={layout} />
          </SwiperSlide>
        ))}
        <div
          className={clsx(
            styles.sliderNavigation,
            styles['sliderNavigation--next']
          )}
          onClick={() => handleSwipeNext()}
        >
          <i className="fa-solid fa-chevron-right"></i>
        </div>
        <div
          className={clsx(
            styles.sliderNavigation,
            styles['sliderNavigation--previous']
          )}
          onClick={() => handleSwipePrevious()}
        >
          <i className="fa-solid fa-chevron-left"></i>
        </div>
      </Swiper>
    </>
  );
};
