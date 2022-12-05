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
  const heroSwiperRef = useRef(null);
  const paginationSwiperRef = useRef(null);
  const [itemList, setItemList] = useState(movieList);
  const [currentMovie, setCurrentMovie] = useState(itemList[0].id);

  const handleSwipeNext = () => {
    paginationSwiperRef.current?.slideNext();
  };

  const handleSwipePrevious = () => {
    paginationSwiperRef.current?.slidePrev();
  };

  const handelSlideTo = (selectedID, index) => {
    let swiper = heroSwiperRef.current;
    swiper.slideTo(index + 1, 1000, false);
    setCurrentMovie(selectedID);
  };

  return (
    <div className={styles.hero}>
      <Swiper
        loop={true}
        modules={[Autoplay, Thumbs, Pagination]}
        onBeforeInit={(swiper) => {
          heroSwiperRef.current = swiper;
        }}
        onSlideChange={(swiper) => {
          const currentIndex = (swiper.activeIndex - 1) % itemList.length;
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
      </Swiper>
      <div className={styles["pagination-wrapper"]}>
        <div className={clsx("container", styles.pagination)}>
          <Swiper
            loop={true}
            speed={600}
            slidesPerGroup={6}
            slidesPerView={7}
            spaceBetween={6}
            breakpoints={{
              1024: {
                slidesPerView: 6,
              },
              300: {
                slidesPerView: 4,
              },
            }}
            onBeforeInit={(swiper) => {
              paginationSwiperRef.current = swiper;
            }}
          >
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
        </div>
      </div>
    </div>
  );
}
