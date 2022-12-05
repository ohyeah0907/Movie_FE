import React from "react";
import { clsx } from "clsx";
import styles from "./css/item.module.scss";
import { memo } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { icon } from "@fortawesome/fontawesome-svg-core/import.macro";

export const Item = memo((props) => {
  const { movie, hero = false, layout = "recommend" } = props;
  return (
    <div
      className={clsx(
        styles.item,
        styles[`item--${layout}`],
        hero ? styles[`item--${layout}--hero`] : ""
      )}
    >
      <div className={clsx(styles.item__imageWrapper)}>
        <img
          className={clsx(styles.item__imageWrapper__content)}
          src={movie.backdrop}
          alt="movie backdrop"
        />
      </div>
      {/* Layout content */}
      <div className={clsx(styles["item__content__overlay"])}>
        <div className={clsx(styles.item__content, "container")}>
          <div className={clsx(styles["item__content-wrapper"])}>
            {/* Name and Rating */}
            <div className={clsx(styles.item__name)}>{movie.name}</div>
            <p className={clsx(styles["item__rating-wrapper"])}>
              Rating:{" "}
              <span className={styles.item__rating}>{movie.rating}</span>/100
            </p>
            {/* Genres */}
            <div className={clsx(styles.item__genres)}>
              <FontAwesomeIcon
                icon={icon({ name: "tag", style: "solid" })}
                className={clsx(styles.item__genres__text__icon)}
              />
              <div className={clsx(styles["item__genres__text-wrapper"])}>
                {movie.genres.map((genres, index) => (
                  <a
                    href="/"
                    className={clsx(styles.item__genres__text)}
                    key={index}
                  >
                    {genres}
                  </a>
                ))}
              </div>
            </div>
            {/* Overview */}
            <div className={clsx(styles.item__overview)}>{movie.overview}</div>
            <div
              className={clsx(
                "d-flex align-items-center",
                styles["item__button-wrapper"]
              )}
            >
              <span
                className={clsx(
                  "button button--secondary",
                  styles["item__button--play"]
                )}
              >
                Watch now
              </span>
              <span
                className={clsx(
                  "button button--favourite",
                  styles["item__button--favourite"]
                )}
              >
                <FontAwesomeIcon icon={["fa-regular", "fa-heart"]} />
                Add to My List
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});
