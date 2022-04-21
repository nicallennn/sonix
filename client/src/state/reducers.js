import { combineReducers } from 'redux';


const authenticated = (loggedIn = false, action) => {

  if (action.type === 'LOGIN') {
    const newLoggedIn = true;
    return newLoggedIn;
  }

  if (action.type === 'LOGOUT') {
    const newLoggedIn = false;
    localStorage.removeItem('accessToken');
    return newLoggedIn;
  }

  return loggedIn;
}

const profile = (userProfile = {}, action) => {
  return userProfile;
}

const dashboardRecipes = (recipes = { dash: [1, 2, 3] }, action) => {
  return recipes;
}

// Combining both reducers
const reducers = combineReducers({
  authenticated,
  profile,
  dashboardRecipes
});

export default reducers;