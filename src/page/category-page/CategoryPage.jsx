import clsx from "clsx";
import styles from "./css/CategoryPage.module.scss";
import React from "react";
import { Link } from "react-router-dom";
import { Action } from "@remix-run/router";
import { Item } from "../../component/item/Item";

const movieList = [
  {
    name: "The Batman",
    poster:
      "https://i.pinimg.com/736x/83/13/30/831330643120469f94d9adaba542b516.jpg",
    backdrop:
      "https://bloody-disgusting.com/wp-content/uploads/2022/01/the-batman-new-poster-2.png",
    rating: 15,
    star: 49,
    genres: ["Horror", "Con cac"],
    overview: "overview 1",
    id: "1",
  },
  {
    name: "The Avenger: End Game",
    poster:
      "https://hips.hearstapps.com/hmg-prod/images/d1pklzbuyaab0la-1552597012.jpg",
    backdrop: "https://cdn.mos.cms.futurecdn.net/QFuzEB2Gxth6qQT8Tpe7LN.jpg",
    rating: 39,
    star: 73,
    genres: ["Action", "Sci-Fi"],
    overview: "overview 2",
    id: "2",
  },
  {
    name: "The Avengers: Infinity War",
    poster:
      "https://upload.wikimedia.org/wikipedia/vi/e/e8/Avengers-Infinity_War-Official-Poster.jpg",
    backdrop:
      "https://waghostwriter.com/wp-content/uploads/2018/05/landscape-1522924460-avengers-infinity-war-poster.jpg",
    rating: 55,
    star: 72,
    genres: ["Action", "Sci-Fi"],
    overview: "overview 3",
    id: "3",
  },
];

export const CategoryPage = () => {
  const renderMenuLinks = (maxRow) => {};
  return (
    <div className={clsx(styles.category)}>
      <div className={clsx(styles["category-nav"])}>
        <div className="container px-0 d-flex align-items-center">
          <div className={clsx(styles["category-nav__title"])}>
            Category Type
          </div>
          <div className="dropdown">
            <div
              className={clsx(styles["category-nav__button"])}
              type="button"
              id="dropdownMenuButton"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >
              Genres{" "}
              <i className={clsx("fa-solid fa-caret-down", styles.icon)}></i>
            </div>
            <div
              className={clsx("row", styles["category-nav__menu"])}
              aria-labelledby="dropdownMenuButton"
            ></div>
          </div>
        </div>
      </div>
      <div className="content-section">
        <div
          className={clsx(
            "container px-0",
            styles.section,
            styles["movie-feature"]
          )}
        >
          <div className={clsx(styles["movie-feature__wrapper"])}>
            <div
              className={clsx(
                styles["movie-title"],
                styles["movie-title--feature"]
              )}
            >
              Featuring Movies
            </div>
            <div className={clsx("row", styles["movie-feature__list"])}>
              {movieList.map((movie, index) => (
                <div
                  key={movie.id}
                  className={clsx("col-3", styles["movie-feature__item"])}
                >
                  <Item movie={movie} layout="feature" />
                </div>
              ))}
            </div>
          </div>
          <div className={clsx(styles["movie-default"])}>
            <div className={clsx("container px-0", styles.section)}>
              <div className={clsx(styles["movie-title"])}>Movies</div>
              <div className={clsx("row", styles["movie-default__list"])}>
                {movieList.map((movie, index) => (
                  <div
                    key={movie.id}
                    className={clsx("col-2", styles["movie-default__item"])}
                  >
                    <Item movie={movie} layout="normal" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
