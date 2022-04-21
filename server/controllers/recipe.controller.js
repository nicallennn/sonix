// import models
const Recipe = require('../models/recipe.model');
//todo - create user controller method to add to likes
const User = require('../models/user.model');
const { categories } = require('../models/category.model');

//! get recipes for dashboard
const getDashBoardRecipes = async (req, res) => {
  //create an object ot store the results
  const results = {};
  try {
    // get popular recipes - sort by rating
    results.popular = await Recipe.find({})
      .sort({ rating: -1 })
      .limit(10)
      .select('_id creator title description rating category originalSynth preview');

    // get category recipes
    for (const cat of categories) {
      results[cat] = await Recipe.find({ category: cat })
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
  // get the recipe id from the req params
  const { id } = req.params;

  // get the recipe
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

//! create a new recipe
const createRecipe = async (req, res) => {
  //todo - get the user id from the auth middleware
  // get the recipe from the request body
  const recipe = req.body;
  // save the new recipe
  try {
    const result = await Recipe.create(recipe);
    if (!result) throw new Error('Could not add recipe to database');

    // add the recipe to the user profile
    const recipeCreator = await User.findById(recipe.creatorId);
    recipeCreator.ownRecipes.push(result._id);
    await recipeCreator.save();

    res.status(201).send(result);
  } catch (error) {
    res.status(500).send({ error, message: 'Failed to create recipe!' });
  }
};


const likeRecipe = async (req, res) => {
  // get the id of the recipe and the user
  //todo - get user id from the token auth middleware later
  const { recipeId, userId } = req.body;
  // adjust the number of likes 
  try {
    // check the user and recipe exists
    const recipeToUpdate = await Recipe.findById(recipeId);
    const userToUpdate = await User.findById(userId);
    if (!recipeToUpdate || !userToUpdate) {
      res.status(404).send({ message: 'Recipe or user not found!' });
    }
    // check use has not already liked this recipe
    if (userToUpdate.likedRecipes.includes(recipeId)) {
      return res.status(400).send({ message: 'User already liked this recipe!' });
    }
    // add the recipe to the users likedRecipes
    userToUpdate.likedRecipes.push(recipeId);
    await userToUpdate.save();

    // increment number of likes and add user to recipe likedBy
    recipeToUpdate.numberOfLikes++;
    recipeToUpdate.likedBy.push(userId);
    const result = await recipeToUpdate.save();

    res.status(200).send(result);

  } catch (error) {
    res.status(500).send({ error, message: 'Failed to like recipe' });
  }
};

const unLikeRecipe = async (req, res) => {
  // get the id of the recipe and the user
  //todo - get user id from the token auth middleware later
  const { recipeId, userId } = req.body;
  // adjust the number of likes 
  try {
    // check the user and recipe exists
    const recipeToUpdate = await Recipe.findById(recipeId);
    const userToUpdate = await User.findById(userId);
    if (!recipeToUpdate || !userToUpdate) {
      res.status(404).send({ message: 'Recipe or user not found!' });
    }
    // check use has already liked this recipe
    if (!userToUpdate.likedRecipes.includes(recipeId)) {
      return res.status(400).send({ message: 'User does not like this recipe' });
    }
    // remove the recipe from the users likedRecipes
    userToUpdate.likedRecipes = userToUpdate.likedRecipes
      .filter(id => id !== recipeId);
    await userToUpdate.save();

    // decrement number of likes and add user to recipe likedBy
    recipeToUpdate.numberOfLikes--;
    recipeToUpdate.likedBy = recipeToUpdate.likedBy.filter(id => id !== userId);
    const result = await recipeToUpdate.save();

    res.status(200).send(result);

  } catch (error) {
    res.status(500).send({ error, message: 'Failed to unlike recipe' });
  }
};

const deleteRecipe = async (req, res) => {

  //todo - get the userId from the auth middleware
  // get the recipe id and user id from the req body
  const { recipeId, userId } = req.body;

  try {
    // check the recipe exists and the user id matches recipe creator id
    const recipeToDelete = await Recipe.findById(recipeId);
    if (!recipeToDelete) {
      res.status(404).send({ message: 'Recipe does not exist!' });
    }

    //check the recipe creatorId is the same as userId
    if (recipeToDelete.creatorId !== userId) {
      res.status(400).send({ message: 'Recipe is not owned by user!' });
    }

    // delete the recipe from the user ownRecipes array
    const recipeCreator = await User.findById(userId);
    recipeCreator.ownRecipes = recipeCreator.ownRecipes.filter(recipe => recipe !== recipeId);
    await recipeCreator.save();


    // delete the recipe from all users in the recipe likedBy array
    for (const userId of recipeToDelete.likedBy) {
      const user = await User.findById(userId);
      user.likedRecipes = user.likedRecipes.filter(recipe => recipe !== recipeId);
      await user.save();
    }

    //delete the recipe from the recipes collection
    const result = await Recipe.findByIdAndDelete(recipeId);
    res.status(200).send({ deletedRecipe: result, message: 'Recipe deleted!' });

  } catch (error) {
    res.status(500).send({ error, message: 'Failed to delete recipe' });
  }


};

module.exports = {
  getDashBoardRecipes,
  getCategoryRecipes,
  getRecipe,
  createRecipe,
  likeRecipe,
  unLikeRecipe,
  deleteRecipe
};
