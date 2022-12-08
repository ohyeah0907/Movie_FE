import React from "react";
import clsx from "clsx";
import { Link } from "react-router-dom";
import styles from "./error.module.scss";

export const ErrorPage = () => {
  return (
    <div className={clsx("section", styles.section__notFound)}>
      <div className="img">
        <img
          src="https://assets.codepen.io/5647096/backToTheHomepage.png"
          alt="Back to the Homepage"
        />
        <img
          src="https://assets.codepen.io/5647096/Delorean.png"
          alt="El Delorean, El Doc y Marti McFly"
        />
      </div>
      <div className={styles.text}>
        <h1>404</h1>
        <h2>PAGE NOT FOUND</h2>
        <h3>
          BACK TO HOME?{" "}
          <Link to={"/"} className="yes">
            YES
          </Link>
        </h3>
      </div>
    </div>
  );
};
