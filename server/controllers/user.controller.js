// imports
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// import models
const User = require('../models/user.model');

// import the token secret
const SECRET = process.env.SECRET;

//! user controller methods 
const createUser = async (req, res) => {
  // get the info from the request body
  const { firstName, lastName, password, email, handle, bio } = req.body;

  try {
    // check the password is not empty
    if (password === '') throw new Error('password is empty');
    // hash the password
    const hash = await bcrypt.hash(password, 10);
    // create the new user
    const { _id } = await User.create({ firstName, lastName, password: hash, email, handle, bio });
    // create a new token and send to the user
    const token = jwt.sign({ _id }, SECRET);
    res.status(201).send({ token });
  } catch (error) {
    res.status(400).send({ error, message: 'Could not create the user' });
  }
};

const loginUser = async (req, res) => {
  // get the email and password
  const { email, password } = req.body;

  try {
    //get the user from db
    const user = await User.findOne({ email });
    //check user exists
    if (!user) throw new Error('Invalid credentials');
    //compare passwords
    const authorized = await bcrypt.compare(password, user.password);
    console.log('authorized', authorized);
    if (!authorized) throw new Error('Invalid credentials');
    // create a new token
    const token = jwt.sign({ _id: user._id }, SECRET);
    //send the user the token
    res.status(200).send({ token });
  } catch (error) {
    res.status(401).send({ error, message: 'Invalid credentials!' });
  }
};

const getUserProfile = async (req, res) => {
  // get the user profile id
  const { userHandle } = req.params;
  try {
    // check the user exists
    const { _id, handle, bio, ownRecipes, likedRecipes } = await User.findOne({ handle: userHandle });
    if (!_id) throw new Error('User profile not found');

    //turn the liked recipes array into an object to speed up checking if recipes are in favorites in frontend
    const likedObject = {};
    likedRecipes.forEach(id => {
      likedObject[id] = true;
    });

    // create the user profile
    const profile = { handle, bio, ownRecipes, likedRecipes: likedObject };
    // return the user profile
    res.status(200).send(profile);

  } catch (error) {
    res.status(404).send({ error, message: 'Profile not found' });
  }
};

// todo - do this later if time
const editUserProfile = async (req, res) => {
  console.log('editUserProfile');
  res.send('editUserProfile');
};

module.exports = { createUser, loginUser, getUserProfile, editUserProfile };