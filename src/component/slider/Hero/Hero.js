import { Swiper, SwiperSlide } from "swiper/react";
import { movieList } from "../../testdata";
import styles from "./Hero.module.scss";
import { HighlightItem as Item } from "../../item";
import "clsx";
import "swiper/css";
import "swiper/css/pagination";

import { BaseUrl } from "../../../constant/api/BaseUrl";
import { Autoplay, Thumbs, Pagination } from "swiper";
import { useEffect, useRef } from "react";
import clsx from "clsx";
import { useState } from "react";
import { getAllMovie } from "../../../service/component/movie";

export function HeroSlider() {
  const heroSwiperRef = useRef(null);
  const paginationSwiperRef = useRef(null);
  const [itemList, setItemList] = useState([]);
  const [currentMovie, setCurrentMovie] = useState(null);

  const controller = new AbortController();
  useEffect(() => {
    let testData = async () => {
      let data = await getAllMovie(controller.signal);
      let dataFiltered = data.filter((value) => value.title !== null);
      setItemList(dataFiltered);
      setCurrentMovie(dataFiltered[0].id);
    };
    testData().catch(console.error);
  }, []);

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
    <>
      {itemList.length > 0 && (
        <div className={styles.hero}>
          <Swiper
            loop={true}
            modules={[Autoplay, Thumbs, Pagination]}
            onBeforeInit={(swiper) => {
              heroSwiperRef.current = swiper;
            }}
            onSlideChange={(swiper) => {
              const currentIndex = (swiper.activeIndex - 1) % itemList.length;
              handleSwipeNext();
              setCurrentMovie(itemList[currentIndex].id);
            }}
            speed={1000}
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
                slidesPerGroup={1}
                speed={1000}
                spaceBetween={6}
                breakpoints={{
                  1024: {
                    slidesPerView: 7,
                  },
                  768: {
                    slidePerView: 5,
                  },
                  300: {
                    slidesPerView: 3,
                  },
                }}
                onBeforeInit={(swiper) => {
                  paginationSwiperRef.current = swiper;
                }}
              >
                {itemList.map((movie, index) => (
                  <SwiperSlide
                    key={movie.id}
                    onClick={(swiper) => {
                      console.log(swiper.activeIndex);
                      handelSlideTo(movie.id, index);
                    }}
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
                        src={BaseUrl.BACKDROP_URL + movie.backdrop_path}
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
      )}
    </>
  );
}
