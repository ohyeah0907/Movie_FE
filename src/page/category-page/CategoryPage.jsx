import clsx from "clsx";
import styles from "./css/CategoryPage.module.scss";
import React from "react";
import { Link } from "react-router-dom";
import { Action } from "@remix-run/router";

export const CategoryPage = () => {
  const renderMenuLinks = (maxRow) => {
    categoryList.map((link, index) => {
      let newCol = 0;
      if (index % maxRow == 0) {
        newCol += 1;
        return (
          <div className={clsx("col", `"column-${newCol}"`)}>
            <Link>{link.name}</Link>
          </div>
        );
      } else {
        const currentCol = document.querySelector(`.col .column-${newCol}`);
        console.log(currentCol);
      }
    });
  };
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
      <div className="movie-section">
        <div className="container px-0">
          <div className={clsx("row", styles["movie-feature"])}>
            <div
              className={clsx("col col-3", styles["movie-feature__item"])}
            ></div>
          </div>
          <div className="movie-lists-other"></div>
        </div>
      </div>
    </div>
  );
};
