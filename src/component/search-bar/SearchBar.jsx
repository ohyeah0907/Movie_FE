import clsx from "clsx";
import React, { useState } from "react";
import styles from "./css/searchBar.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { icon } from "@fortawesome/fontawesome-svg-core/import.macro";
import { useNavigate } from "react-router-dom";

export const SearchBar = () => {
  const navigate = useNavigate();

  const getFilmBySearch = (e) => {
    if (e.key == "Enter") {
      navigate(`/search?name=${e.currentTarget.value}`);
      e.currentTarget.value = "";
    }
  };
  return (
    <div className={clsx(styles["search-bar"])}>
      <input
        className={clsx(styles["search-bar__input-content"])}
        onKeyUp={(e) => {
          getFilmBySearch(e);
        }}
      />
      <FontAwesomeIcon
        className={clsx(
          styles["search-bar__icon"],
          styles["search-bar__icon--search"]
        )}
        icon={icon({ name: "magnifying-glass", style: "solid" })}
      />
      <FontAwesomeIcon
        className={clsx(
          styles["search-bar__icon"],
          styles["search-bar__icon--delete"]
        )}
        icon={icon({ name: "xmark", style: "solid" })}
      />
    </div>
  );
};
