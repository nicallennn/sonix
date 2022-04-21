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
};

const profile = (userProfile = {}, action) => {
  if (action.type === 'SET_USER_PROFILE') {
    const newProfile = action.profile;
    return newProfile;
  }
  return userProfile;
};

const dashboardRecipes = (recipes = {}, action) => {
  if (action.type === 'SET_DASHBOARD_RECIPES') {
    const newDashboardRecipes = action.recipes;
    return newDashboardRecipes;
  }


  return recipes;
};

// Combining both reducers
const reducers = combineReducers({
  authenticated,
  profile,
  dashboardRecipes
});

export default reducers;