import React, { useEffect, useState, useContext, useLayoutEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { routes } from "../../routes/routes";
import { userContext } from "../../layout/UserContext";
import styles from "./Header.module.scss";
import clsx from "clsx";
import { MainLogo, Burger } from "../Logo";
import { useCookies } from "react-cookie";
import { isExpired, decodeToken } from "react-jwt";
import { useLocation } from "react-router-dom";
import { SearchBar } from "../search-bar/SearchBar";

export const Header = () => {
  const { pathname } = useLocation();
  const [cookies, setCookie, removeCookie] = useCookies(["refresh_token"]);
  const [showSideBar, setShowSideBar] = useState(false);
  const [navHeader, setNavHeader] = useState(routes);
  const [active, setActive] = useState(pathname);
  const context = useContext(userContext);
  const user = decodeToken(localStorage.getItem("access_token"));
  const navigation = useNavigate();

  console.log(">>> Current user: " + user?.sub);

  const handleShow = () => {
    setShowSideBar(!showSideBar);
  };

  const handleSignOut = () => {
    removeCookie("refresh_token");
    localStorage.clear();
    context.handleToken({});
    reverseHide();
    navigation({ pathname: "/" });
  };

  const handleActive = (path) => {
    console.log(path);
    setActive(path);
  };

  useEffect(() => {
    setActive(pathname);
  }, [pathname]);

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
          "container  px-0 align-items-center justify-content-between",
          styles.container
        )}
      >
        <div className={clsx("d-flex h-100", styles["navbar__nav-left"])}>
          <Link
            onClick={() => setActive("/")}
            className={clsx(
              "d-inline-flex align-items-center link",
              styles.navbar__logo
            )}
            to="/"
          >
            <MainLogo />
          </Link>
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
        {/* <div className={clsx(styles["navbar__search-bar"])}>
          <SearchBar />
        </div> */}
        <ul id="nav" className={clsx("align-items-center", styles.navbar__nav)}>
          <div className={clsx(styles["navbar__search-bar-menu"])}>
            <SearchBar />
          </div>
          {navHeader.map((route) => {
            if (route.hasOwnProperty("hide")) {
              if (route.hide === false) {
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
                    >
                      {route.text}
                    </Link>
                  </span>
                );
              }
            } else {
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
                  >
                    {route.text}
                  </Link>
                </span>
              );
            }
          })}
          {user?.sub ? (
            <div
              className={clsx("link", styles.navItem__link)}
              onClick={handleSignOut}
            >
              Sign out
            </div>
          ) : (
            ""
          )}
        </ul>
      </div>
    </div>
  );
};
