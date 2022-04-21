import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { login, logout } from './state/actions';

import AuthenticatedApp from './authenticated-app';
import UnauthenticatedApp from './unauthenticated-app';

import './App.scss';

function App() {
  const loggedIn = useSelector(state => state.authenticated);
  const userProfile = useSelector(state => state.profile);
  const dispatch = useDispatch();

  //! check if the user is logged in or not, dispatch login action to store if true
  useEffect(() => {
    // localStorage.setItem('accessToken', 'test');
    // check if user is logged in and set store state
    const token = localStorage.getItem('accessToken');
    if (token) {
      //set store state as logged in
      dispatch(login());
    }
  });

  return (
    <div className="App">
      {loggedIn ? <AuthenticatedApp /> : <UnauthenticatedApp />}
    </div>
  );
}

export default App;
