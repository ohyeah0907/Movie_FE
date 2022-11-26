import { Swiper, SwiperSlide } from "swiper/react";
import { movieList } from "../../testdata";
import styles from "./Hero.module.scss";
import { Item } from "../../item/Item";
import "clsx";
import "swiper/css";
import "swiper/css/pagination";

import { Autoplay, Thumbs, Pagination } from "swiper";
import { useRef } from "react";
import clsx from "clsx";

export function HeroSlider() {
  const swiperRef = useRef(null);

  const handleSwipeNext = () => {
    swiperRef.current?.slideNext();
  };

  const handleSwipePrevious = () => {
    swiperRef.current?.slidePrev();
  };

  const pagination = {
    type: "custom",
    clickable: true,
    renderCustom: (_, current, total) => {
      return <div> Hello world </div>;
    },
  };

  let random = movieList.slice(0, 3);

  return (
    <>
      <Swiper
        loop={true}
        modules={[Autoplay, Thumbs, Pagination]}
        onBeforeInit={(swiper) => {
          swiperRef.current = swiper;
        }}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        pagination={pagination}
        grabCursor={true}
        className={styles.swiper}
      >
        {random.map((movie, index) => (
          <SwiperSlide key={movie.id}>
            <Item movie={movie} layout="recommend" />
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
    </>
  );
}
