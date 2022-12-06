import clsx from "clsx";
import React, { useEffect, useState } from "react";
import styles from "./css/HomePage.module.scss";
import { movieList } from "../../component/testdata";
import { Col, Row } from "react-bootstrap";
import { FadeSlider, HeroSlider } from "../../component/slider";
import { NormalItem, HighlightItem } from "../../component/item";
import { DefaultSlider } from "../../component/slider/Default";

export const HomePage = () => {
  const featureList = movieList.filter((movie, index) => {
    return movie.rating > 50 && index < 4 ? movie : undefined;
  });

  return (
    <div className="home">
      <div className={clsx(styles.section, styles.section__hero)}>
        <HeroSlider></HeroSlider>
      </div>
      <div className={clsx("section", styles["section__highlight"])}>
        <div className="container">
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
        <div className="container">
          <div className={clsx(styles["section__heading"])}>
            <div className={clsx(styles["section__title"])}>New Releases</div>
            <div className={clsx(styles["section__paragraph"])}>
              Our most recently released movies.
            </div>
          </div>
          <DefaultSlider layout="normal" sortDate={true} />
        </div>
      </div>
    </div>
  );
};
