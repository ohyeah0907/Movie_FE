import { Swiper, SwiperSlide } from "swiper/react";
import { movieList } from "../../testdata";
import styles from "./Hero.module.scss";
import { HighlightItem as Item } from "../../item";
import "clsx";
import "swiper/css";
import "swiper/css/pagination";

import { Autoplay, Thumbs, Pagination } from "swiper";
import { useRef } from "react";
import clsx from "clsx";
import { useState } from "react";

export function HeroSlider() {
  const swiperRef = useRef(null);
  const [itemList, setItemList] = useState(movieList);
  const [currentMovie, setCurrentMovie] = useState(itemList[0].id);

  const handleSwipeNext = () => {
    swiperRef.current?.slideNext();
  };

  const handleSwipePrevious = () => {
    swiperRef.current?.slidePrev();
  };

  const handelSlideTo = (selectedID, index) => {
    swiperRef.current?.slideTo(index + 1, 1000, false);
    setCurrentMovie((prev) => (prev = selectedID));
  };

  const handleSlideChange = (swiper) => {
    console.log(swiper.activeIndex);
    const currentIndex = swiper.activeIndex - 1;
    setCurrentMovie(itemList[currentIndex].id);
  };

  return (
    <div className={styles.hero}>
      <Swiper
        loop={true}
        modules={[Autoplay, Thumbs, Pagination]}
        onBeforeInit={(swiper) => {
          swiperRef.current = swiper;
        }}
        onSlideChange={(swiper) => {
          if (swiper.isEnd) swiper.activeIndex = 1;
          const currentIndex = swiper.activeIndex - 1;
          console.log(swiper.activeIndex);
          setCurrentMovie(itemList[currentIndex].id);
        }}
        speed={650}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        grabCursor={true}
        className={styles.swiper}
      >
        {itemList.map((movie, index) => (
          <SwiperSlide key={movie.id}>
            <Item movie={movie} hero={true} />
          </SwiperSlide>
        ))}
        <div
          className={clsx(
            styles.swiperNavigation,
            styles["swiperNavigation--next"]
          )}
          onClick={() => handleSwipeNext()}
        >
          <i className="fa-solid fa-chevron-right"></i>
        </div>
        <div
          className={clsx(
            styles.swiperNavigation,
            styles["swiperNavigation--previous"]
          )}
          onClick={() => handleSwipePrevious()}
        >
          <i className="fa-solid fa-chevron-left"></i>
        </div>
      </Swiper>
      <div className={clsx(styles["pagination-wrapper"])}>
        <div class="container">
          <Swiper slidesPerView={7} spaceBetween={8}>
            {itemList.map((movie, index) => (
              <SwiperSlide
                key={movie.id}
                onClick={() => handelSlideTo(movie.id, index)}
              >
                <div
                  className={clsx(
                    styles["pagination-item"],
                    movie.id === currentMovie
                      ? styles["pagination-item--active"]
                      : ""
                  )}
                >
                  <img
                    className={styles["pagination-item__image"]}
                    src={movie.backdrop}
                  />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </div>
  );
}
