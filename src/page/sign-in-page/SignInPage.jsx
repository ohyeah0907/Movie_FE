import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { userContext } from '../../layout/UserContext';
import { getUser } from '../../service/sign-in-page/SignInPageService';

export const SignInPage = () => {
  const user = useContext(userContext);
  const navigate = useNavigate();

  const handleSignIn = () => {
    getUser().then((data) => {
      if (data.name === 'admin') {
        navigate('/admin', { state: { ...data } });
      } else {
        localStorage.setItem('user', JSON.stringify(data));
        user.handleUser(data);
        navigate('/');
      }
    });
  };
  return (
    <div>
      <div>Sign In Page</div>
      <button onClick={handleSignIn}>sign in</button>
    </div>
  );
};
