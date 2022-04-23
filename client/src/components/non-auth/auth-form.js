import { loginUser } from '../../services/userAPI';
import { login } from '../../state/actions';
import { useDispatch } from 'react-redux';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AuthForm = ({ title, type }) => {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [loginMessage, setLoginMessage] = useState(null);
  const handleSubmit = async (e) => {
    e.preventDefault();

    //! handle login
    if (type === 'login') {
      const user = {
        email: e.target.email.value,
        password: e.target.password.value
      };

      if (user.email && user.password) {
        // log user in
        const loggedIn = await loginUser(user);
        if (loggedIn.fetched) {
          //set state in store
          dispatch(login());
          navigate('/');
        } else {
          //display error message
          setLoginMessage(loggedIn.error.message);
          e.target.reset();
        }
      }
    }

  };

  return (
    <form onSubmit={handleSubmit} className="auth-form">
      <h2 className="title">{title}</h2>
      <input type="email" name="email" placeholder="email" />
      <input type="password" name="password" placeholder="password" />
      <input className="submit-btn" type="submit" value={title} />
      {loginMessage && <p className="error-message">{loginMessage}</p>}
    </form>
  );
};

export default AuthForm;