import React, { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import { routes } from "../../routes/routes";
import { userContext } from "../../layout/UserContext";
import styles from "./Header.module.scss";
import clsx from "clsx";
import { MainLogo } from "../Logo";

export const Header = () => {
  const [navHeader, setNavHeader] = useState(routes);
  const [active, setActive] = useState("Home");
  const user = useContext(userContext);

  const handleSignOut = () => {
    user.handleUser({});
    localStorage.clear();
    reverseHide();
  };

  const handleActive = (text) => {
    console.log(text);
    setActive(text);
  };

  // reverse property hide of object
  const reverseHide = () => {
    setNavHeader((prev) => {
      return prev.map((route) => {
        if (route.hasOwnProperty("hide")) {
          route.hide = !route.hide;
          return route;
        } else return route;
      });
    });
  };
  useEffect(() => {
    if (user.name) reverseHide();
  }, [user]);

  return (
    <div className={styles.navbar}>
      <div
        className={clsx(
          "container-md align-items-center justify-content-betwwen ",
          styles.container
        )}
      >
        <Link
          className={clsx(
            "d-flex align-items-center link",
            styles.navbar__logo
          )}
        >
          <MainLogo />
          <h1 className={clsx(styles.navbar__text)}>
            <span className="bold">Rest</span> and{" "}
            <span className="bold">Relax</span>
          </h1>
        </Link>
        <ul className={clsx("align-items-center", styles.navbar__nav)}>
          {user.name ? <div>{user.name}</div> : ""}
          {navHeader.map((route) => {
            if (route.hasOwnProperty("hide")) {
              if (route.hide === false) {
                return (
                  <li className={styles.navItem} key={route.text}>
                    <Link
                      className={clsx(
                        "link",
                        styles.navItem__link,
                        route.text === active
                          ? styles["navItem__link--active"]
                          : ""
                      )}
                      to={route.path}
                      onClick={() => handleActive(route.text)}
                    >
                      {route.text}
                    </Link>
                  </li>
                );
              }
            } else
              return (
                <li className={styles.navItem} key={route.text}>
                  <Link
                    className={clsx(
                      "link",
                      styles.navItem__link,
                      route.text === active
                        ? styles["navItem__link--active"]
                        : ""
                    )}
                    to={route.path}
                    onClick={() => handleActive(route.text)}
                  >
                    {route.text}
                  </Link>
                </li>
              );
            return null;
          })}
          {user.name ? <button onClick={handleSignOut}>Sign out</button> : ""}
        </ul>
      </div>
    </div>
  );
};
