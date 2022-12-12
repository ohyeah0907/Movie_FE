import { Swiper, SwiperSlide } from "swiper/react";
import { useState, useEffect, useRef } from "react";
import styles from "./Slider.module.scss";
import { NormalItem as Item } from "../../item";
import { getAllMovie } from "../../../service/component/movie";
import { ItemLoader } from "../../skeleton";
import { memo } from "react";
import clsx from "clsx";
import "swiper/css";
import "swiper/css/pagination";

export const DefaultSlider = memo((props) => {
  const {
    layout = "normal",
    category = null,
    sortDate = false,
    tvShow = false,
  } = props;
  const [itemList, setItemList] = useState([]);
  const paginationSwiperRef = useRef();
  const controller = new AbortController();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let filteringData = async () => {
      let data = await getAllMovie(controller.signal).finally();
      setIsLoading(false);

      let dataFiltered = data.data.filter(
        (movie) => movie.title !== null && movie.backdrop_path !== null
      );

      if (layout.includes("feature"))
        dataFiltered = dataFiltered.filter(
          (movie) => movie.vote_average > 5 && movie.genres.length > 0
        );

      if (tvShow) {
        dataFiltered = dataFiltered.filter((movie) => movie.isMovie === 0);
      }

      if (sortDate) {
        let moviesWithDateFiltered = [...dataFiltered]
          .filter((movie) => movie.release_date !== null)
          .sort((movie1, movie2) => {
            let date1 = new Date(movie1.release_date);
            let date2 = new Date(movie2.release_date);
            return date2 - date1;
          });
        dataFiltered = [...moviesWithDateFiltered];
      } else {
        dataFiltered = shuffleData([...dataFiltered]);
      }

      if (category) {
        let categoryFiltered = [...dataFiltered].filter((movie) => {
          return movie.genres.some((genre) => genre.name === category);
        });
        if (categoryFiltered.length > 0) {
          dataFiltered = [...categoryFiltered];
        }
      }

      setItemList(dataFiltered);
    };
    filteringData().catch(console.error);
  }, [category]);

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
        breakpoints={{
          200: layout.includes("feature")
            ? {
                slidesPerView: 4,
              }
            : {
                slidesPerView: 3,
              },
          // when window width is >= 480px
          680: layout.includes("feature")
            ? {
                slidesPerView: 4,
              }
            : {
                slidesPerView: 5,
              },
          // when window width is >= 640px
          1100: layout.includes("feature")
            ? {
                slidesPerView: 5,
              }
            : {
                slidesPerView: 7,
              },
        }}
        onBeforeInit={(swiper) => {
          paginationSwiperRef.current = swiper;
        }}
      >
        {isLoading === true ? (
          <>
            {[...Array(5).keys()].map((loader) => {
              return (
                <SwiperSlide key={loader}>
                  <ItemLoader layout={layout} isLoading={isLoading} />
                </SwiperSlide>
              );
            })}
          </>
        ) : (
          <>
            {itemList.map((movie) => (
              <SwiperSlide key={movie.id}>
                <Item movie={movie} layout={layout} />
              </SwiperSlide>
            ))}
          </>
        )}
        <div
          className={clsx(
            styles.sliderNavigation,
            styles["sliderNavigation--next"]
          )}
          onClick={() => handleSwipeNext()}
        >
          <i className="fa-solid fa-chevron-right"></i>
        </div>
        <div
          className={clsx(
            styles.sliderNavigation,
            styles["sliderNavigation--previous"]
          )}
          onClick={() => handleSwipePrevious()}
        >
          <i className="fa-solid fa-chevron-left"></i>
        </div>
      </Swiper>
    </>
  );
});
