import React from "react";
import { clsx } from "clsx";
import styles from "./css/item.module.scss";
import { memo } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { icon } from "@fortawesome/fontawesome-svg-core/import.macro";

export const Item = memo((props) => {
  const { movie, layout = "normal" } = props;
  return (
    <div className={clsx(styles.item, styles[`item--${layout}`])}>
      <div className={clsx(styles.item__imageWrapper)}>
        <img
          className={clsx(styles.item__imageWrapper__content)}
          src={layout.includes("feature") ? movie.poster : movie.backdrop}
          alt="movie"
        />
      </div>
      {/* Layout content */}
      <div className={clsx(styles["item__content__overlay"])}>
        <div className={clsx(styles.item__content)}>
          <div className={clsx(styles["item__content-wrapper"])}>
            {/* Name and Rating */}
            <div className="d-flex align-items-center">
              <div className={clsx(styles.item__name)}>{movie.name}</div>
              {layout.includes("feature") ? (
                <p className={clsx(styles["item__rating-wrapper"])}>
                  <span className={styles.item__rating}>{movie.rating}</span>
                  /100
                </p>
              ) : (
                ""
              )}
            </div>
            {layout.includes("feature") ? (
              <>
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
                <div className={clsx(styles.item__overview)}>
                  {movie.overview}
                </div>
              </>
            ) : (
              ""
            )}
          </div>
        </div>
      </div>
    </div>
  );
});