import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { icon } from '@fortawesome/fontawesome-svg-core/import.macro';
import React, {
  useContext,
  useEffect,
  useState,
  useRef,
  useReducer,
} from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { userContext } from '../../layout/UserContext';
import { signIn, signUp } from '../../service/sign-in-page/SignInPageService';
import clsx from 'clsx';
import { useCookies } from 'react-cookie';
import styles from './css/sign-in-page.module.css';
import {
  initialState,
  reducer,
  checkValidEmailAction,
  checkValidPasswordAction,
  checkValidRePasswordAction,
} from '../../utils/sign-in-page/Validate';

export const SignInPage = () => {
  const [signInForm, setSignInForm] = useState(true);
  const [cookies, setCookie] = useCookies(['refresh_token']);
  const context = useContext(userContext);
  const controller = new AbortController();
  const [state, dispatch] = useReducer(reducer, initialState);
  const navigate = useNavigate();

  useEffect(() => {
    return () => controller.abort();
  }, []);

  const handleSignIn = async (email, password) => {
    const res = await signIn(email, password, controller.signal);
    setCookie('refresh_token', res.data.refreshToken, { path: '/' });
    localStorage.setItem('access_token', res.data.token);
    context.handleToken({
      refreshToken: res.data.refreshToken,
    });
    navigate({ pathname: '/' });
  };

  const handleSignUp = (email, password) => {
    signUp(email, password, controller.signal).then((res) => {
      console.table(res);
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
                    className={clsx(
                      styles.signInPage__wrapper__modal__content__info__name,
                      { [styles['invalid-input']]: state.email?.message }
                    )}
                  >
                    <FontAwesomeIcon
                      icon={icon({ style: 'solid', name: 'user' })}
                    />
                    <input
                      autoComplete="off"
                      placeholder="Email"
                      name="email"
                      onBlur={(e) => {
                        console.log(
                          '>>> Email value: ' + e.currentTarget.value
                        );
                        dispatch(checkValidEmailAction(e.currentTarget.value));
                      }}
                    />
                    <span className={clsx(styles.progressing)}></span>
                  </div>
                  {state.email?.message && (
                    <div className={clsx(styles['invalid-message'])}>
                      {state.email.message}
                    </div>
                  )}
                  <div
                    className={clsx(
                      styles.signInPage__wrapper__modal__content__info__password,
                      { [styles['invalid-input']]: state.password?.message }
                    )}
                  >
                    <FontAwesomeIcon
                      icon={icon({ style: 'solid', name: 'key' })}
                    />
                    <input
                      autoComplete="off"
                      placeholder="Password"
                      name="password"
                      type="password"
                      onBlur={(e) => {
                        console.log(
                          '>>> Password value: ' + e.currentTarget.value
                        );
                        dispatch(
                          checkValidPasswordAction(e.currentTarget.value)
                        );
                      }}
                    />
                    <span className={clsx(styles.progressing)}></span>
                  </div>
                  {state.password?.message && (
                    <div className={clsx(styles['invalid-message'])}>
                      {state.password.message}
                    </div>
                  )}
                  {signInForm ? (
                    false
                  ) : (
                    <>
                      <div
                        className={clsx(
                          styles.signInPage__wrapper__modal__content__info__password,
                          {
                            [styles['invalid-input']]:
                              state.rePassword?.message,
                          }
                        )}
                      >
                        <FontAwesomeIcon
                          icon={icon({ style: 'solid', name: 'key' })}
                        />
                        <input
                          placeholder="Confirm password"
                          name="confirm-password"
                          type="password"
                          onBlur={(e) => {
                            dispatch(
                              checkValidRePasswordAction(e.currentTarget.value)
                            );
                          }}
                        />
                        <span className={clsx(styles.progressing)}></span>
                      </div>
                      {state.rePassword?.message && (
                        <div className={clsx(styles['invalid-message'])}>
                          {state.rePassword.message}
                        </div>
                      )}
                    </>
                  )}
                </div>
                <button
                  className={
                    styles.signInPage__wrapper__modal__content__submitButton
                  }
                  onClick={() => {
                    console.log(state);
                    if (state.email.value === '')
                      dispatch(checkValidEmailAction(''));
                    if (state.password.value === '')
                      dispatch(checkValidPasswordAction(''));
                    if (signInForm) {
                      if (
                        state.email.value !== '' &&
                        state.password.value !== ''
                      )
                        handleSignIn(state.email.value, state.password.value);
                    } else {
                      if (state.rePassword.value === '')
                        dispatch(checkValidRePasswordAction(''));
                      else
                        handleSignUp(
                          state.email.value,
                          state.password.value,
                          state.rePassword.value
                        );
                    }
                  }}
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
