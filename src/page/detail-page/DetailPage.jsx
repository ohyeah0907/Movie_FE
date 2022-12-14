import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { icon } from "@fortawesome/fontawesome-svg-core/import.macro";
import clsx from "clsx";
import React, { useEffect, useRef, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import styles from "./css/detail-page.module.css";
import {
  getDetailMovie,
  getDetailMovieVideo,
  getDetailTV,
  getDetailTVSeason,
  getDetailTVVideo,
} from "../../service/detail-page/DetailPageService";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { Movie } from "../../model/Movie";
import { TVSeries } from "../../model/TVSeries";
import { Episode } from "../../component/episode/Episode";
import { SeasonDropBox } from "../../component/season-dropbox/SeasonDropBox";
import { Comment } from "../../component/comment/Comment";
import { Link } from "react-router-dom";
import { addToWishlist } from "../../service/component/userWishList";

/* Trang Detail page sẽ nhận object có thuộc tính id và isMovie, isMovie để kiểm tra xem id vừa nhận
là của TV series hay Movie */

export const DetailPage = () => {
  // Clean up request fetch mỗi khi unmounted
  let controller = new AbortController();
  const { movieId } = useParams();
  const [searchParams] = useSearchParams();
  const isMovie = useRef(searchParams.get("is-movie"));
  const [movie, setMovie] = useState({});
  const [season, setSeason] = useState(1);
  const [listEpisode, setListEpisode] = useState([]);
  const navigate = useNavigate();

  /* Kiểm tra id nhận vào là tv series hay là movie từ đó fetch dữ liệu phù hợp, ngoài ra thì còn kiểm tra url của trang */
  useEffect(() => {
    getDataFirstTime(isMovie);

    return () => controller.abort();
  }, []);

  /* Lấy danh sách episode của season đầu vì giả dụ tv series nào cũng có it nhất là 1 season đầu */
  useEffect(() => {
    if (isMovie.current === "false") getEpisodes();
    return () => controller.abort();
  }, [season]);

  const getEpisodes = async () => {
    getDetailTVSeason(movieId, season, controller.signal).then((data) => {
      const { episodes } = data;
      setListEpisode(episodes);
    });
  };
  const handleAddToWishList = (movieId) => {
    addToWishlist(movieId);
  };
  useEffect(() => {
    document.querySelector("body").scrollTo(0, 0);
  }, []);

  const getDataFirstTime = async () => {
    if (
      isMovie.current === null ||
      (isMovie.current !== "true" && isMovie.current !== "false")
    )
      navigate(-1);

    let film;
    if (isMovie.current === "true") {
      const {
        id,
        title,
        poster_path,
        backdrop_path,
        vote_average,
        popularity,
        genres,
        overview,
      } = await getDetailMovie(movieId, controller.signal)
        .then((data) => data)
        .catch((error) => navigate("/error"));
      const trailer = await getDetailMovieVideo(movieId, controller.signal)
        .then((data) => data.results[0].key)
        .catch((error) => navigate("/error"));

      film = new Movie(
        id,
        title,
        poster_path,
        backdrop_path,
        vote_average,
        popularity,
        genres,
        overview,
        trailer
      );
    } else {
      const {
        id,
        name,
        poster_path,
        backdrop_path,
        vote_average,
        popularity,
        genres,
        overview,
        number_of_seasons,
      } = await getDetailTV(movieId, controller.signal)
        .then((data) => data)
        .catch((error) => navigate("/error"));
      const trailer = await getDetailTVVideo(movieId, controller.signal)
        .then((data) => data.results[0].key)
        .catch((error) => navigate("/error"));
      film = new TVSeries(
        id,
        name,
        poster_path,
        backdrop_path,
        vote_average,
        popularity,
        genres,
        overview,
        number_of_seasons,
        trailer
      );
    }
    setMovie(film);
  };

  return (
    <Container fluid className={clsx(styles.detailPage)}>
      <div
        className={clsx(styles.detailPage__background)}
        style={{ backgroundImage: `url(${movie?.backdrop})` }}
      ></div>
      <Container fluid="xl" className={clsx(styles.detailPage__wrapper)}>
        {/* Movie general infomation */}
        <div className={clsx(styles.detailPage__wrapper__generalInfo)}>
          <Row xl={12} lg={12} xs={12}>
            <Col xl={4} lg={4} xs={12}>
              <div
                className={clsx(styles.detailPage__wrapper__generalInfo__image)}
              >
                <div
                  className={clsx(
                    styles.detailPage__wrapper__generalInfo__image__rating
                  )}
                >
                  {movie?.rating ? Math.floor(movie.rating) : false}
                </div>
                <img src={movie.poster} alt="movie" />
              </div>
            </Col>
            <Col xl={8} lg={12} xs={12}>
              <div
                className={clsx(
                  styles.detailPage__wrapper__generalInfo__content
                )}
              >
                {/* Movie's name */}
                <p
                  className={clsx(
                    styles.detailPage__wrapper__generalInfo__content__name
                  )}
                >
                  {movie?.name}
                </p>
                {/* Star and genres */}
                <div
                  className={clsx(
                    styles.detailPage__wrapper__generalInfo__content__starGenres
                  )}
                >
                  {movie?.genres ? (
                    <div className={clsx(styles.genres)}>
                      {movie.genres.map((genre, index) => (
                        <Link
                          to={{
                            pathname: "/category",
                          }}
                          state={{
                            selectedGenre: genre.name,
                          }}
                          className={clsx(styles.genres__link)}
                          key={index}
                        >
                          <FontAwesomeIcon
                            icon={icon({ name: "tag", style: "solid" })}
                            className={clsx(styles.genres__icon)}
                          />
                          {genre.name}
                        </Link>
                      ))}
                    </div>
                  ) : (
                    false
                  )}
                </div>
                {/* Overview */}
                <div
                  className={clsx(
                    styles.detailPage__wrapper__generalInfo__content__overview
                  )}
                >
                  {movie?.overview}
                </div>
                <div
                  className={clsx(
                    styles.detailPage__wrapper__generalInfo__content__button
                  )}
                >
                  <a href="#video" className={clsx(styles.buttonWatch)}>
                    Watch
                  </a>
                  <a
                    className={clsx(styles.buttonWishList)}
                    onClick={() => handleAddToWishList(movie?.id)}
                  >
                    Add to my favorite
                  </a>
                </div>
              </div>
            </Col>
          </Row>
        </div>
        <div className={clsx(styles.detailPage__wrapper__trailer)}>
          <Row xl={12} lg={12}>
            <Col xl={12} lg={12}>
              <div
                className={clsx(styles.detailPage__wrapper__trailer__content)}
              >
                <div
                  className={clsx(
                    styles.detailPage__wrapper__trailer__content__heading
                  )}
                >
                  Official trailer of this movie
                </div>
                <div
                  className={clsx(
                    styles.detailPage__wrapper__trailer__content__video
                  )}
                  id="video"
                >
                  <iframe src={movie.trailer} title="trailer"></iframe>
                </div>
              </div>
            </Col>
          </Row>
        </div>
        {movie?.seasons ? (
          <div className={clsx(styles.detailPage__wrapper__season)}>
            <Row xl={12} lg={12}>
              <Col xl={12} lg={12}>
                <div
                  className={clsx(styles.detailPage__wrapper__season__content)}
                >
                  <div
                    className={clsx(
                      styles.detailPage__wrapper__season__content__heading
                    )}
                  >
                    <p className={clsx(styles.headingWord)}>Episodes</p>
                    <div
                      className={clsx(
                        styles.detailPage__wrapper__season__content__heading__dropbox
                      )}
                    >
                      <SeasonDropBox
                        season={season}
                        seasons={movie.seasons}
                        handleClick={(value) => {
                          setSeason(value);
                        }}
                      />
                    </div>
                  </div>
                  {/* List episode */}
                  {isMovie.current === "false" ? (
                    <ul
                      className={clsx(
                        styles.detailPage__wrapper__season__content__episode
                      )}
                    >
                      {listEpisode.map(
                        (
                          {
                            episode_number,
                            name,
                            overview,
                            runtime,
                            still_path,
                          },
                          index
                        ) => (
                          <Episode
                            episode={{
                              episode_number,
                              name,
                              overview,
                              runtime,
                              still_path,
                            }}
                            key={index}
                          />
                        )
                      )}
                    </ul>
                  ) : (
                    false
                  )}
                </div>
              </Col>
            </Row>
          </div>
        ) : (
          false
        )}
        {/* Comment */}
        <div className={clsx(styles.detailPage__wrapper__comment)}>
          <Row xl={12} lg={12}>
            <Col xl={12} lg={12}>
              <div
                className={clsx(styles.detailPage__wrapper__comment__content)}
              >
                <Comment movieId={movieId} />
              </div>
            </Col>
          </Row>
        </div>
      </Container>
    </Container>
  );
};
