import { useEffect } from 'react';

import { loginUser } from '../services/userAPI';
import { useDispatch } from 'react-redux';
import { login } from '../state/actions';
import { useNavigate } from 'react-router-dom';

import './styles/login.scss';
import AuthForm from '../components/non-auth/auth-form';

const Login = () => {
  let navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogin = async (user) => {
    console.log('attempt to signin user: ', user);
    //todo - get the user login details
    // // try login the user
    // const loginResult = await loginUser(user);
    // // if the user was logged in successfully
    // if (loginResult.fetched) {
    //   // get the token and store in local storage
    //   const { token } = loginResult.data;
    //   localStorage.setItem('accessToken', token);
    //   // set the 'authenticated' state and navigate to dashboard
    //   dispatch(login());
    //   navigate('/dashboard');
    // }
  };


  return (
    <div className="auth-wrapper">
      <AuthForm title="Login" type="login" />
    </div>
  );
};

export default Login;