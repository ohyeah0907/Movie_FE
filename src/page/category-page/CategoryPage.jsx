import clsx from 'clsx';
import styles from './css/CategoryPage.module.scss';
import React, { useEffect, useRef, useState } from 'react';
import { Link, useAsyncError } from 'react-router-dom';
import { Action } from '@remix-run/router';
import { movieList, categoryList } from '../../component/testdata';
import { DefaultSlider } from '../../component/slider/Default';
import { NormalItem } from '../../component/item';
import { getAllGenres } from '../../service/component/movie-genres';

export const CategoryPage = () => {
  const [data, setData] = useState(movieList);
  const [genresList, setGenresList] = useState([]);
  const [genresMenu, setGenresMenu] = useState([]);
  const [currentGenre, setCurrentGenre] = useState('Genres');
  const [showCategoryMenu, setShowCatergoryMenu] = useState(false);

  const handleChangeGenre = (selectedGenre) => {
    setCurrentGenre(selectedGenre);
    setShowCatergoryMenu(false);
  };

  const featureList = movieList.filter((movie, index) => {
    return movie.rating > 50 && index < 4 ? movie : undefined;
  });

  const renderMenuColumns = (menuList = [], maxRow) => {
    var menuColumn = [];
    for (let index = 0; index < menuList.length; index += maxRow + 1) {
      menuColumn.push(menuList.slice(index, maxRow + index));
    }
    console.log(menuColumn);
    return menuColumn;
  };

  useEffect(() => {
    let getGenresData = async () => {
      let rawData = await getAllGenres();
      console.log(rawData);
      let genresMenuFiltered = rawData.data.filter((genre) => genre !== null);
      setGenresList(genresMenuFiltered);
      let menuColumns = renderMenuColumns(genresMenuFiltered, 9);
      setGenresMenu(menuColumns);
    };
    getGenresData().catch(console.error);
  }, []);

  return (
    <div className={clsx(styles.category)}>
      <div className={clsx(styles['category-nav'])}>
        <div
          className={clsx(
            'container d-flex align-items-center',
            styles['category__wrapper']
          )}
        >
          <div
            className={clsx([
              styles['category-nav__wrapper'],
              showCategoryMenu ? styles['category-nav__wrapper--focus'] : '',
            ])}
          >
            <div
              className={clsx(
                'd-flex justify-content-between align-items-center',
                styles['category-nav__button']
              )}
              onClick={() => {
                setShowCatergoryMenu(!showCategoryMenu);
              }}
            >
              <div>
                <i
                  className={clsx('fa-sharp fa-solid fa-film', styles.icon)}
                ></i>
                {currentGenre}
              </div>
              <i className={clsx('fa-solid fa-caret-down')}></i>
            </div>
            <div
              className={clsx('d-none row mx-0', styles['category-nav__menu'])}
            >
              <div className={styles['category-nav__menu-close']}>
                <span className={styles['category-nav__menu-close-btn']}>
                  Exit
                </span>
              </div>
              {genresMenu &&
                genresMenu.map((menuCol, index) => (
                  <div
                    key={index}
                    className={clsx('col', styles['category-nav__menu-col'])}
                  >
                    {menuCol.map((menuLink) => (
                      <div
                        key={menuLink.id}
                        className={clsx(styles['category-nav__menu-link'])}
                        onClick={() => handleChangeGenre(menuLink.name)}
                      >
                        {menuLink.name}
                      </div>
                    ))}
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
      <div className="content-section">
        <div
          className={clsx('container', styles.section, styles['movie-feature'])}
        >
          <div className={clsx(styles['movie-feature__wrapper'])}>
            <div
              className={clsx(
                styles['movie-title'],
                styles['movie-title--feature']
              )}
            >
              Featuring Movies
            </div>
            <DefaultSlider layout="feature" />
          </div>
          <div className={clsx(styles['movie-default'])}>
            <div className={clsx(styles.section)}>
              <div className={clsx(styles['movie-title'])}>Movies</div>
              <DefaultSlider category={'Kids'} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
