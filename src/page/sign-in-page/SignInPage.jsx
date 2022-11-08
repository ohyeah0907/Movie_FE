import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { icon } from '@fortawesome/fontawesome-svg-core/import.macro';
import React, { useContext, useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { userContext } from '../../layout/UserContext';
import { getUser } from '../../service/sign-in-page/SignInPageService';
import clsx from 'clsx';
import styles from './css/sign-in-page.module.css';

export const SignInPage = () => {
  const user = useContext(userContext);
  const [signInForm, setSignInForm] = useState(true);
  const navigate = useNavigate();
  const handleSignIn = () => {
    getUser().then((data) => {
      if (data[0].roleId === 2) {
        navigate('/admin');
      } else {
        localStorage.setItem('user', JSON.stringify(data[0]));
        user.handleUser(data[0]);
        navigate('/');
      }
    });
  };
  return (
    <Container fluid className={styles.signInPage}>
      <div className={clsx(styles.signInPage__overlay)}></div>
      <Container className={styles.signInPage__wrapper}>
        <div className={styles.signInPage__wrapper__modal}>
          <Row xl={12} lg={12}>
            <Col xl={12} lg={12}>
              <div className={styles.signInPage__wrapper__modal__content}>
                <div
                  className={clsx(
                    styles.signInPage__wrapper__modal__content__overlay
                  )}
                ></div>
                <div
                  className={clsx(
                    styles.signInPage__wrapper__modal__content__heading
                  )}
                >
                  <p
                    className={clsx(
                      styles.signInPage__wrapper__modal__content__heading__close
                    )}
                    onClick={() => {
                      navigate('/');
                    }}
                  >
                    <FontAwesomeIcon
                      icon={icon({ style: 'solid', name: 'xmark' })}
                    />
                  </p>
                  <p
                    className={clsx(
                      styles.signInPage__wrapper__modal__content__heading__title
                    )}
                  >
                    {signInForm ? 'Sign In' : 'Sign Up'}
                  </p>
                </div>
                <div
                  className={styles.signInPage__wrapper__modal__content__info}
                >
                  <div
                    className={
                      styles.signInPage__wrapper__modal__content__info__name
                    }
                  >
                    <FontAwesomeIcon
                      icon={icon({ style: 'solid', name: 'user' })}
                    />
                    <input placeholder="Account" name="account" />
                    <span className={clsx(styles.progressing)}></span>
                  </div>
                  <div
                    className={
                      styles.signInPage__wrapper__modal__content__info__password
                    }
                  >
                    <FontAwesomeIcon
                      icon={icon({ style: 'solid', name: 'key' })}
                    />
                    <input
                      placeholder="Password"
                      name="password"
                      type="password"
                    />
                    <span className={clsx(styles.progressing)}></span>
                  </div>
                  {signInForm ? (
                    false
                  ) : (
                    <div
                      className={
                        styles.signInPage__wrapper__modal__content__info__password
                      }
                    >
                      <FontAwesomeIcon
                        icon={icon({ style: 'solid', name: 'key' })}
                      />
                      <input
                        placeholder="Confirm password"
                        name="confirm-password"
                        type="password"
                      />
                      <span className={clsx(styles.progressing)}></span>
                    </div>
                  )}
                </div>
                <button
                  className={
                    styles.signInPage__wrapper__modal__content__submitButton
                  }
                  onClick={() => {}}
                >
                  Submit
                </button>
                <div
                  className={styles.signInPage__wrapper__modal__content__form}
                >
                  <button
                    className={
                      styles.signInPage__wrapper__modal__content__form__signIn
                    }
                    onClick={() => {
                      setSignInForm(true);
                    }}
                  >
                    Sign in
                  </button>
                  <button
                    className={
                      styles.signInPage__wrapper__modal__content__form__signIn
                    }
                    onClick={() => {
                      setSignInForm(false);
                    }}
                  >
                    Sign Up
                  </button>
                </div>
              </div>
            </Col>
          </Row>
        </div>
      </Container>
    </Container>
  );
};
