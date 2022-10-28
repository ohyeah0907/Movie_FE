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
    rating: 70,
    star: 49,
    genres: ["Action", "Detective"],
    overview:
      "Batman ventures into Gotham City's underworld when a sadistic killer leaves behind a trail of cryptic clues. As the evidence begins to lead closer to home and the scale of the perpetrator's plans become clear, he must forge new relationships, unmask the culprit and bring justice to the abuse of power and corruption that has long plagued the metropolis.",
    id: "1",
  },
  {
    name: "Avengers: End Game",
    poster:
      "https://hips.hearstapps.com/hmg-prod/images/d1pklzbuyaab0la-1552597012.jpg",
    backdrop: "https://cdn.mos.cms.futurecdn.net/QFuzEB2Gxth6qQT8Tpe7LN.jpg",
    rating: 75,
    star: 73,
    genres: ["Action", "Sci-Fi"],
    overview: "overview 2",
    id: "2",
  },
  {
    name: "Avengers: Infinity War",
    poster:
      "https://upload.wikimedia.org/wikipedia/vi/e/e8/Avengers-Infinity_War-Official-Poster.jpg",
    backdrop:
      "https://waghostwriter.com/wp-content/uploads/2018/05/landscape-1522924460-avengers-infinity-war-poster.jpg",
    rating: 90,
    star: 72,
    genres: ["Action", "Sci-Fi"],
    overview: "overview 3",
    id: "3",
  },
  {
    name: "Avengers: Infinity War",
    poster:
      "https://upload.wikimedia.org/wikipedia/vi/e/e8/Avengers-Infinity_War-Official-Poster.jpg",
    backdrop:
      "https://waghostwriter.com/wp-content/uploads/2018/05/landscape-1522924460-avengers-infinity-war-poster.jpg",
    rating: 90,
    star: 72,
    genres: ["Action", "Sci-Fi"],
    overview: "overview 3",
    id: "3",
  },
  {
    name: "Avengers: Infinity War",
    poster:
      "https://upload.wikimedia.org/wikipedia/vi/e/e8/Avengers-Infinity_War-Official-Poster.jpg",
    backdrop:
      "https://waghostwriter.com/wp-content/uploads/2018/05/landscape-1522924460-avengers-infinity-war-poster.jpg",
    rating: 90,
    star: 72,
    genres: ["Action", "Sci-Fi"],
    overview: "overview 3",
    id: "3",
  },
  {
    name: "Avengers: Infinity War",
    poster:
      "https://upload.wikimedia.org/wikipedia/vi/e/e8/Avengers-Infinity_War-Official-Poster.jpg",
    backdrop:
      "https://waghostwriter.com/wp-content/uploads/2018/05/landscape-1522924460-avengers-infinity-war-poster.jpg",
    rating: 90,
    star: 72,
    genres: ["Action", "Sci-Fi"],
    overview: "overview 3",
    id: "3",
  },

  {
    name: "Avengers: Infinity War",
    poster:
      "https://upload.wikimedia.org/wikipedia/vi/e/e8/Avengers-Infinity_War-Official-Poster.jpg",
    backdrop:
      "https://waghostwriter.com/wp-content/uploads/2018/05/landscape-1522924460-avengers-infinity-war-poster.jpg",
    rating: 90,
    star: 72,
    genres: ["Action", "Sci-Fi"],
    overview: "overview 3",
    id: "3",
  },
];

const categoryList = [
  {
    id: 1,
    name: "Action",
  },
  {
    id: 2,
    name: "Anime",
  },
  {
    id: 3,
    name: "Dramas",
  },
  {
    id: 4,
    name: "Romance",
  },
  {
    id: 5,
    name: "Sus",
  },
  {
    id: 6,
    name: "Sussy",
  },
  {
    id: 7,
    name: "LMAO",
  },
];

export const CategoryPage = () => {
  const featureList = movieList.filter((movie, index) => {
    return movie.rating > 50 && index < 4 ? movie : undefined;
  });

  const renderMenuColumns = (menuList = [], maxRow) => {
    var menuColumn = [];
    while (menuList.length > 0) menuColumn.push(menuList.splice(0, maxRow));
    return menuColumn;
  };

  let menuColumns = renderMenuColumns(categoryList, 3);

  return (
    <div className={clsx(styles.category)}>
      <div className={clsx(styles["category-nav"])}>
        <div
          className={clsx(
            "container d-flex align-items-center",
            styles["category__wrapper"]
          )}
        >
          <div className={clsx(styles["category-nav__title"])}>
            Category Type
          </div>
          <div className={clsx(styles["category-nav__wrapper"])}>
            <div className={clsx(styles["category-nav__button"])}>
              Genres{" "}
              <i className={clsx("fa-solid fa-caret-down", styles.icon)}></i>
            </div>
            <div
              className={clsx("d-none row mx-0", styles["category-nav__menu"])}
            >
              <div className={styles["category-nav__menu-close"]}>
                <span className={styles["category-nav__menu-close-btn"]}>
                  Exit
                </span>
              </div>
              {menuColumns.map((menuCol, index) => (
                <div
                  key={index}
                  className={clsx("col", styles["category-nav__menu-col"])}
                >
                  {menuCol.map((menuLink) => (
                    <Link
                      className={clsx(
                        "link",
                        styles["category-nav__menu-link"]
                      )}
                    >
                      {menuLink.name}
                    </Link>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="content-section">
        <div
          className={clsx("container", styles.section, styles["movie-feature"])}
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
            <div
              className={clsx("row flex-wrap", styles["movie-feature__list"])}
            >
              {featureList.map((movie, index) => (
                <div
                  key={index}
                  className={clsx(
                    "col-md-3 col-6 ",
                    styles["movie-feature__item"]
                  )}
                >
                  <Item movie={movie} layout="feature" />
                </div>
              ))}
            </div>
          </div>
          <div className={clsx(styles["movie-default"])}>
            <div className={clsx(styles.section)}>
              <div className={clsx(styles["movie-title"])}>Movies</div>
              <div
                className={clsx("row flex-wrap", styles["movie-default__list"])}
              >
                {movieList.map((movie, index) => (
                  <div
                    key={index}
                    className={clsx(
                      "col-lg-2 col-md-3 col-sm-4 col-6",
                      styles["movie-default__item"]
                    )}
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
