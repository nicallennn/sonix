// import models
const Recipe = require('../models/recipe.model');
const { categories } = require('../models/category.model');

//! get recipes for dashboard
const getDashBoardRecipes = async (req, res) => {
  //create an object ot store the results
  const results = {};
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
    }

    // return the result to the user
    res.status(200).send(results);
  } catch (error) {
    res.status(500).send({ error, message: 'Failed to get recipes' });
  }
};

//! get recipes by category
const getCategoryRecipes = async (req, res) => {
  //get the category name
  const { categoryName } = req.params;
  //check the category exists
  if (!categories.includes(categoryName)) {
    res.status(404).send({ message: 'Invalid category selected!' });
  }

  try {
    //get category recipes - ordered by rating
    const results = await Recipe.find({ category: categoryName }).sort({ rating: -1 });
    res.status(200).send(results);
  } catch (error) {
    res.status(500).send({ error, message: 'Could not fetch category recipes' });
  }
};

//! get a single recipe
const getRecipe = async (req, res) => {
  //get the recipe id from the req params
  const { id } = req.params;

  //get the recipe
  try {
    const recipe = await Recipe.findById(id);
    if (!recipe) {
      res.status(404).send({ message: 'Invalid recipe ID!' });
    }
    res.status(200).send(recipe);
  } catch (error) {
    res.status(500).send({ error, message: 'Could not fetch recipe' });
  }

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
