import clsx from "clsx";
import React from "react";
import styles from "./css/HomePage.module.scss";
import { movieList } from "../../component/testdata";
import { Item } from "../../component/item/Item";
import { Col } from "react-bootstrap";

export const HomePage = () => {
  const featureList = movieList.filter((movie, index) => {
    return movie.rating > 50 && index < 4 ? movie : undefined;
  });

  return (
    <div className="home">
      <div className={clsx("section", styles["section__highlight"])}>
        <div className="container">
          <div className={clsx(styles["section__heading"])}>
            <div className={clsx(styles["section__title"])}>Highlights</div>
            <div className={clsx(styles["section__paragraph"])}>
              Be sure not to miss these movies today.
            </div>
          </div>
          <div
            className={clsx(
              "row",
              styles["section__content"],
              styles["movie__feature-list"]
            )}
          >
            {featureList.map((movie) => (
              <div
                className={clsx(
                  "col-md-3 col-6",
                  styles["movie__feature-item"]
                )}
              >
                <Item movie={movie} layout="feature"></Item>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className={clsx("section", styles["section__new"])}>
        <div className="container">
          <div className={clsx(styles["section__heading"])}>
            <div className={clsx(styles["section__title"])}>New Releases</div>
            <div className={clsx(styles["section__paragraph"])}>
              Our most recently released movies.
            </div>
          </div>
          <div className={clsx(styles.section__content)}>
            <div className={clsx("row", styles["section__content-wrapper"])}>
              <Col xl={3}>
                <Item movie={movieList[0]} layout="feature-home" />
              </Col>
              <div className={clsx("col", styles["movie__list-alt"])}>
                <div className="row gx-2 gy-3">
                  {movieList.map((movie, index) => (
                    <Col xl={3}>
                      <Item movie={movie} layout="normal-home" />
                    </Col>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
