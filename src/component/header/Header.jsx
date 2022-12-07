import React, { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import { routes } from "../../routes/routes";
import { userContext } from "../../layout/UserContext";
import styles from "./Header.module.scss";
import clsx from "clsx";
import { MainLogo, Burger } from "../Logo";
import { useCookies } from "react-cookie";
import { isExpired, decodeToken } from "react-jwt";
import { useLocation } from "react-router-dom";

export const Header = () => {
  const { pathname } = useLocation();

  const [cookies, setCookie, removeCookie] = useCookies(["refresh_token"]);
  const [showSideBar, setShowSideBar] = useState(false);
  const [navHeader, setNavHeader] = useState(routes);
  const [active, setActive] = useState(pathname);
  const context = useContext(userContext);
  const user = decodeToken(localStorage.getItem("access_token"));

  console.log(">>> Current user: " + user?.sub);

  const handleShow = () => {
    setShowSideBar(!showSideBar);
  };

  const handleSignOut = () => {
    removeCookie("refresh_token");
    localStorage.clear();
    context.handleToken({});
    reverseHide();
  };

  const handleActive = (path) => {
    setActive(path);
  };

  useEffect(() => {});

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
    if (user?.sub) {
      console.log(">>> Have user");
      reverseHide();
    } else console.log(">>> Do not have user");
  }, [context]);

  return (
    <div className={styles.navbar}>
      <div
        className={clsx(
          "container-lg  px-0 align-items-center justify-content-betwwen ",
          styles.container
        )}
      >
        <div className={clsx("d-flex h-100", styles["navbar__nav-left"])}>
          <Link
            onClick={() => setActive("Home")}
            className={clsx(
              "d-inline-flex align-items-center link",
              styles.navbar__logo
            )}
            to="/"
          >
            <MainLogo />
          </Link>
          <div
            className={clsx(
              "d-inline-flex align-items-center",
              styles.navbar__nav
            )}
          >
            {navHeader.map((route) => {
              if (route.hasOwnProperty("hide") === false) {
                return (
                  <span className={styles.navItem} key={route.text}>
                    <Link
                      className={clsx(
                        "link",
                        styles.navItem__link,
                        route.path === active
                          ? styles["navItem__link--active"]
                          : ""
                      )}
                      to={route.path}
                      onClick={() => handleActive(route.path)}
                    >
                      {route.text}
                    </Link>
                  </span>
                );
              }
            })}
          </div>
        </div>
        <div
          id="burger"
          className={clsx(
            "d-xl-none d-lg-none d-md-block text-white z",
            styles.burger__btn,
            showSideBar ? styles["burger__btn--over"] : ""
          )}
          onClick={() => {
            handleShow();
          }}
        >
          <Burger size="30" fill="#fff"></Burger>
        </div>
        <ul id="nav" className={clsx("align-items-center", styles.navbar__nav)}>
          {user?.sub ? <div>{user.sub}</div> : ""}
          {navHeader.map((route) => {
            if (route.hasOwnProperty("hide")) {
              if (route.hide === false) {
                return (
                  <span className={styles.navItem} key={route.text}>
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
                  </span>
                );
              }
            }
          })}
          {user?.sub ? <button onClick={handleSignOut}>Sign out</button> : ""}
        </ul>
      </div>
    </div>
  );
};
