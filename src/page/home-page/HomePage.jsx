import clsx from "clsx";
import React, { useEffect, useState } from "react";
import styles from "./css/HomePage.module.scss";
import { FadeSlider, HeroSlider } from "../../component/slider";
import { DefaultSlider } from "../../component/slider/Default";
import { getAllGenres } from "../../service/component/movie-genres";

export const HomePage = () => {
  const [randomGenres, setRandomGenres] = useState();
  const controller = new AbortController();

  useEffect(() => {
    let filteringData = async () => {
      let data = await getAllGenres(controller.signal).finally();
      let dataFiltered = data.data
        .filter((genre) => genre.movies.length > 6)
        .map((genre) => genre.name);
      dataFiltered = shuffleData(dataFiltered);
      setRandomGenres(dataFiltered);
    };
    filteringData().catch(controller.error);
  }, []);

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

  const randomLayout = () => {
    let layouts = ["feature", "normal"];
    return layouts[Math.floor(Math.random() * layouts.length)];
  };

  console.log(randomLayout());
  return (
    <div className="home">
      <div className={clsx(styles.section, styles.section__hero)}>
        <HeroSlider></HeroSlider>
      </div>
      <div className={clsx("section", styles["section__highlight"])}>
        <div className="container-lg">
          <div className={clsx(styles["section__heading"])}>
            <div className={clsx(styles["section__title"])}>Highlights</div>
            <div className={clsx(styles["section__paragraph"])}>
              Be sure not to miss these movies today.
            </div>
          </div>
          <DefaultSlider layout="feature" />
        </div>
      </div>
      <div className={clsx("section", styles.section__recommend)}>
        <FadeSlider></FadeSlider>
      </div>
      <div className={clsx("section", styles["section__new"])}>
        <div className="container-lg">
          <div className={clsx(styles["section__heading"])}>
            <div className={clsx(styles["section__title"])}>New Releases</div>
            <div className={clsx(styles["section__paragraph"])}>
              Our most recently released movies.
            </div>
          </div>
          <DefaultSlider layout="normal" sortDate={true} />
        </div>
      </div>
      <div className={clsx("section")}>
        <div className="container-lg">
          <div className={clsx(styles["section__heading"])}>
            <div className={clsx(styles["section__title"])}>
              Amazing TV-Shows
            </div>
            <div className={clsx(styles["section__paragraph"])}>
              Don't pass on these thrilling TV shows
            </div>
          </div>
          <DefaultSlider layout="feature" tvShow={true} />
        </div>
      </div>
      {randomGenres &&
        randomGenres.map((genre, index) => (
          <div key={index} className={clsx("section")}>
            <div className="container-lg">
              <div className={clsx(styles["section__heading"])}>
                <div className={clsx(styles["section__title"])}>{genre}</div>
              </div>
              <DefaultSlider layout={randomLayout()} category={genre} />
            </div>
          </div>
        ))}
    </div>
  );
};
