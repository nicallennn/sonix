import { useEffect } from 'react';

import { loginUser } from '../services/userAPI';

const Login = () => {

  const testUser = {
    email: 'nicaba@123.com',
    password: '1234'
  };

  useEffect(() => {
    loginUser(testUser)
      .then(res => {
        console.log('create user result: ', res);
      })
      .catch(error => console.error(error));

  }, []);

  return (
    <>
      <h1>login</h1>
    </>
  );
};

export default Login;