import React, { useEffect } from "react";
import clsx from "clsx";
import styles from "./ListPage.module.scss";
import { DefaultSlider as Slider } from "../../component/slider/Default";
import { NormalItem as Item } from "../../component/item";
import { getAllMovie } from "../../service/component/movie";
import { Row, Col } from "react-bootstrap";
import { useState } from "react";
import { decodeToken } from "react-jwt";
import { getUserDetail } from "../../service/component/userWishList";

export const ListPage = () => {
  const [userMovies, setUserMovies] = useState([]);
  const controller = new AbortController();
  const token = localStorage.getItem("access_token");

  useEffect(() => {
    let getUserWishList = async () => {
      let userDetails = await getUserDetail(controller.signal);
      let wishList = userDetails.data.wishLists.map((list) => list.movie);
      console.log(wishList);
      let data = await getAllMovie(controller.signal);
      let dataFiltered = data.data.filter((movie) =>
        wishList.includes(movie.id)
      );
      console.log(dataFiltered);
      setUserMovies(dataFiltered);
    };

    getUserWishList().catch(console.error());
  }, []);

  return (
    <div className={clsx("section")}>
      <div className="container">
        <div className={clsx(styles["section__heading"])}>
          <div className={clsx(styles["section__title"])}>
            My Favourite Movie List{" "}
          </div>
          <div className={clsx(styles["section__paragraph"])}>
            Here are your beloved movies.
          </div>
        </div>
        <div className="row gx-3 gy-4">
          {userMovies.map((movie) => (
            <Col md={2} sm={3}>
              <Item movie={movie} layout="normal-home"></Item>
            </Col>
          ))}
        </div>
      </div>
    </div>
  );
};
