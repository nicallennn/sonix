// import models
const Recipe = require('../models/recipe.model')

//recipe controller methods
const getDashBoardRecipes = (req, res) => {
  console.log('getDashBoardRecipes');
  res.send('getDashBoardRecipes');
};

const getCategoryRecipes = (req, res) => {
  console.log('getCategoryRecipes');
  res.send('getCategoryRecipes');
};

const getRecipe = (req, res) => {
  console.log('getRecipe');
  res.send('getRecipe');
};

const createRecipe = (req, res) => {
  console.log('createRecipe');
  res.send('createRecipe');
};

const rateRecipe = (req, res) => {
  console.log('rateRecipe');
  res.send('rateRecipe');
};

const likeRecipe = (req, res) => {
  console.log('likeRecipe');
  res.send('likeRecipe');
};

const deleteRecipe = (req, res) => {
  console.log('deleteRecipe');
  res.send('deleteRecipe');
};

module.exports = {
  getDashBoardRecipes,
  getCategoryRecipes,
  getRecipe,
  createRecipe,
  rateRecipe,
  likeRecipe,
  deleteRecipe
};
