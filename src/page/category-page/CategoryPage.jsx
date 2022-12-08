import clsx from 'clsx';
import styles from './css/CategoryPage.module.scss';
import React, { useEffect, useRef, useState } from 'react';
import { DefaultSlider } from '../../component/slider/Default';
import { getAllGenres } from '../../service/component/movie-genres';
import { useLocation } from 'react-router-dom';

export const CategoryPage = () => {
  const location = useLocation();
  const data = location.state?.selectedGenre;
  const [genresMenu, setGenresMenu] = useState([]);
  const [currentGenre, setCurrentGenre] = useState('Genres');
  const [showCategoryMenu, setShowCatergoryMenu] = useState(false);

  if (data) {
    console.log(data);
    let lmao = data;
  }

  const handleChangeGenre = (selectedGenre) => {
    setCurrentGenre(selectedGenre);
    setShowCatergoryMenu(false);
  };

  const renderMenuColumns = (menuList = [], maxRow) => {
    var menuColumn = [];
    for (let index = 0; index < menuList.length; index += maxRow + 1) {
      menuColumn.push(menuList.slice(index, maxRow + index));
    }
    return menuColumn;
  };

  useEffect(() => {
    let getGenresData = async () => {
      let rawData = await getAllGenres();
      let genresMenuFiltered = rawData.filter(
        (genre) => genre !== null && genre.movies.length > 0
      );
      let menuColumns = renderMenuColumns(
        genresMenuFiltered,
        Math.floor(genresMenuFiltered.length / 3)
      );
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
            className={clsx('d-flex align-items-center', [
              styles['category-nav__wrapper'],
              showCategoryMenu ? styles['category-nav__wrapper--focus'] : '',
            ])}
          >
            {currentGenre !== 'Genres' && (
              <span
                className={clsx(
                  'd-inline-flex justify-content-between align-items-center',
                  styles['category-nav__button'],
                  styles['category-nav__button--label']
                )}
                onClick={() => setCurrentGenre('Genres')}
              >
                Genres <i className="fa-solid fa-angle-right"></i>
              </span>
            )}
            <div
              className={clsx(
                'd-inline-flex justify-content-between align-items-center',
                styles['category-nav__button'],
                currentGenre !== 'Genres'
                  ? styles['category-nav__button--selected']
                  : ''
              )}
              onClick={() => {
                setShowCatergoryMenu(!showCategoryMenu);
              }}
            >
              <div>
                <span className={styles['category-nav__button-text']}>
                  <i
                    className={clsx('fa-sharp fa-solid fa-film', styles.icon)}
                  ></i>
                  {currentGenre}
                </span>
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
            <DefaultSlider
              layout="feature"
              category={currentGenre !== 'Genres' ? currentGenre : null}
            />
          </div>
          <div className={clsx(styles['movie-default'])}>
            <div className={clsx(styles.section)}>
              <div className={clsx(styles['movie-title'])}>Movies</div>
              <DefaultSlider
                layout="normal"
                category={currentGenre !== 'Genres' ? currentGenre : null}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
