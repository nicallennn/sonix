// import models
const Recipe = require('../models/recipe.model');
const { categories } = require('../models/category.model');

//! recipe controller methods
const getDashBoardRecipes = async (req, res) => {

  const result = {};
  try {
    // get popular recipes - sort by rating
    result.popular = await Recipe.find({})
      .sort({ rating: -1 })
      .limit(10)
      .select('_id creator title description rating category originalSynth preview');

    // get category recipes
    for (const cat of categories) {
      result[cat] = await Recipe.find({ category: cat })
        .sort({ rating: -1 })
        .limit(10)
        .select('_id creator title description rating category originalSynth preview');
    };

    // return the result to the user
    res.status(200).send(result);
  } catch (error) {
    res.status(500).send({ error, message: 'Failed to get recipes' });
  }
};

const getCategoryRecipes = async (req, res) => {
  console.log('getCategoryRecipes');
  res.send('getCategoryRecipes');
};

const getRecipe = async (req, res) => {
  console.log('getRecipe');
  res.send('getRecipe');
};

const createRecipe = async (req, res) => {
  console.log('createRecipe');
  res.send('createRecipe');
};

const rateRecipe = async (req, res) => {
  console.log('rateRecipe');
  res.send('rateRecipe');
};

const likeRecipe = async (req, res) => {
  console.log('likeRecipe');
  res.send('likeRecipe');
};

const deleteRecipe = async (req, res) => {
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
