//imports
const express = require('express');
const router = express.Router();

//import the controller methods
const {
  createUser,
  loginUser,
  getUserProfile,
  editUserProfile
} = require('./controllers/user.controller');

const {
  getDashBoardRecipes,
  getCategoryRecipes,
  getRecipe,
  createRecipe,
  rateRecipe,
  likeRecipe,
  deleteRecipe
} = require('./controllers/recipe.controller');

//! unauthenticated routes
// recipes
router.get('/dashboard', getDashBoardRecipes);
router.get('/category/:id', getCategoryRecipes);
router.get('/recipe/:id', getRecipe);

// users
router.get('/profile/:userHandle', getUserProfile);
router.post('/register', createUser);
router.post('/login', loginUser);

//! authenticated routes
// recipes
router.post('/recipe/create', createRecipe);
router.patch('/recipe/rate', rateRecipe);
router.patch('/recipe/like', likeRecipe);
router.delete('/recipe/delete', deleteRecipe);

// users
router.patch('/profile/edit', editUserProfile);

//export the router
module.exports = router;

