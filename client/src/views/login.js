import { useEffect } from 'react';

import { loginUser } from '../services/userAPI';
import { useDispatch } from 'react-redux';
import { login } from '../state/actions';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  let navigate = useNavigate();
  const dispatch = useDispatch();

  const testUser = {
    email: 'tim322@123.com',
    password: '1234'
  };

  const handleLogin = async () => {
    // try login the user
    const loginResult = await loginUser(testUser);
    // if the user was logged in successfully
    if (loginResult.fetched) {
      // get the token and store in local storage
      const { token } = loginResult.data;
      localStorage.setItem('accessToken', token);
      // set the 'authenticated' state and navigate to dashboard
      dispatch(login());
      navigate('/dashboard');
    }
  };

  useEffect(() => {

  }, []);

  return (
    <>
      <h1>login</h1>\
      <button onClick={handleLogin}>login</button>
    </>
  );
};

export default Login;