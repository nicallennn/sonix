//imports
const express = require('express');
const router = express.Router();
const validateUser = require('./middlewares/validate-user');

//import the controller methods
const {
  createUser,
  loginUser,
  getUserProfile,
  editUserProfile,
  getMyProfile
} = require('./controllers/user.controller');

const {
  searchAllRecipes,
  getDashBoardRecipes,
  getCategoryRecipes,
  getRecipe,
  createRecipe,
  likeRecipe,
  unLikeRecipe,
  deleteRecipe,
  getUserRecipes
} = require('./controllers/recipe.controller');

//! unauthenticated routes
// recipes
router.get('/searchAll/:searchTerm', searchAllRecipes);
router.get('/dashboard', getDashBoardRecipes);
router.get('/category/:categoryName', getCategoryRecipes);
router.get('/recipe/:id', getRecipe);
router.post('/recipe/user', getUserRecipes);

// users
router.get('/user/:userHandle', getUserProfile);
router.post('/register', createUser);
router.post('/login', loginUser);

//! authenticated routes
// recipes
router.get('/profile/myProfile', validateUser, getMyProfile);
router.post('/recipe/create', validateUser, createRecipe);
router.patch('/recipe/like', validateUser, likeRecipe);
router.patch('/recipe/unlike', validateUser, unLikeRecipe);
router.delete('/recipe/delete', validateUser, deleteRecipe);

// users
router.patch('/profile/edit', validateUser, editUserProfile);

//export the router
module.exports = router;

