import { Swiper, SwiperSlide } from "swiper/react";
import { movieList } from "../../testdata";
import styles from "./FadeSlider.module.scss";
import { HighlightItem as Item } from "../../item";
import "clsx";
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/pagination";

import { Autoplay, Thumbs, Pagination, EffectFade } from "swiper";
import { useRef } from "react";
import clsx from "clsx";
import { useState } from "react";

export function FadeSlider() {
  const swiperRef = useRef(null);
  const [itemList, setItemList] = useState(movieList);

  const handleSwipeNext = () => {
    swiperRef.current?.slideNext();
  };

  const handleSwipePrevious = () => {
    swiperRef.current?.slidePrev();
  };

  return (
    <div className={styles.hero}>
      <Swiper
        effect={"fade"}
        loop={true}
        modules={[Autoplay, EffectFade, Thumbs, Pagination]}
        onBeforeInit={(swiper) => {
          swiperRef.current = swiper;
        }}
        speed={650}
        autoplay={{
          delay: 5000,
        }}
        className={styles.swiper}
      >
        {itemList.map((movie, index) => (
          <SwiperSlide key={movie.id}>
            <Item movie={movie} />
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
  );
}
