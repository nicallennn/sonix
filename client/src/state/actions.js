//! user actions
export const login = () => ({
  type: 'LOGIN'
});

export const logout = () => ({
  type: 'LOGOUT'
});

export const setUserProfile = (profile) => ({
  type: 'SET_USER_PROFILE',
  profile
});

//! user recipe actions
export const likeRecipe = (recipeId) => ({
  type: 'LIKE_RECIPE',
  recipeId
});

export const unlikeRecipe = (recipeId) => ({
  type: 'UNLIKE_RECIPE',
  recipeId
});

export const createRecipe = (newRecipe) => ({
  type: 'CREATE_RECIPE',
  newRecipe
});

export const deleteRecipe = (recipeId) => ({
  type: 'DELETE_RECIPE',
  recipeId
});

//! recipe actions
export const setDashboardRecipes = (recipes) => ({
  type: 'SET_DASHBOARD_RECIPES',
  recipes
});

