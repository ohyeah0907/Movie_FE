import clsx from "clsx";
import "swiper/css";
import "swiper/css/pagination";
import { Swiper, SwiperSlide } from "swiper/react";
import { useState, useEffect, useRef } from "react";
import styles from "./Hero.module.scss";
import { HighlightItem as Item } from "../../item";
import { Autoplay, Thumbs, Pagination } from "swiper";

import { BaseUrl } from "../../../constant/api/BaseUrl";
import { getAllMovie } from "../../../service/component/movie";

export function HeroSlider() {
  const heroSwiperRef = useRef(null);
  const heroPaginationRef = useRef(null);
  const [itemList, setItemList] = useState([]);
  const [currentMovie, setCurrentMovie] = useState(null);

  const controller = new AbortController();

  const shuffleData = (array) => {
    let currentIndex = array.length,
      randomIndex;

    // While there remain elements to shuffle.
    while (currentIndex != 0) {
      // Pick a remaining element.
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;

      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex],
        array[currentIndex],
      ];
    }

    return array;
  };

  useEffect(() => {
    let getData = async () => {
      let data = await getAllMovie(controller.signal);
      let dataFiltered = data.filter(
        (item) =>
          item.title !== null &&
          item.vote_average > 5 &&
          item.overview.length > 0
      );
      dataFiltered = shuffleData(dataFiltered);
      if (dataFiltered.length > 20) dataFiltered = dataFiltered.splice(0, 20);
      console.log(dataFiltered.length);
      setItemList(dataFiltered);
      setCurrentMovie(dataFiltered[0].id);
    };
    getData().catch(console.error);
  }, []);

  const handleSwipeNext = () => {
    heroPaginationRef.current?.slideNext();
  };

  const handleSwipePrevious = () => {
    heroPaginationRef.current?.slidePrev();
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
            speed={850}
            autoplay={{
              delay: 7000,
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
                  200: {
                    slidesPerView: 4,
                  },
                  680: {
                    slidesPerView: 5,
                  },
                  1200: {
                    slidesPerView: 7,
                  },
                }}
                onBeforeInit={(swiper) => {
                  heroPaginationRef.current = swiper;
                }}
              >
                {itemList.map((movie, index) => (
                  <SwiperSlide
                    key={movie.id}
                    onClick={(swiper) => {
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
