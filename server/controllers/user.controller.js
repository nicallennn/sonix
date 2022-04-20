// imports
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// import models
const User = require('../models/user.model')
const UserProfile = require('../models/userProfile.model')

// import the token secret
const SECRET = process.env.SECRET;

//user controller methods 
const createUser = async (req, res) => {
  // get the info from the request body
  const { firstName, lastName, password, email, handle } = req.body;

  try {
    //check the password is not empty
    if (password === "") throw new Error('password is empty')
    //hash the password
    const hash = await bcrypt.hash(password, 10);
    //create the new user
    const { _id } = await User.create({ firstName, lastName, password: hash, email, handle });
    //create a new token and send to the user
    const token = jwt.sign({ _id }, SECRET);
    res.status(201).send({ token });
  } catch (error) {
    res.status(400).send({ error, message: 'Could not create the user' })
  }
};

const loginUser = (req, res) => {
  console.log('loginUser');
  res.send('loginUser');
};

const getUserProfile = (req, res) => {
  console.log('getUserProfile');
  res.send('getUserProfile');
};

const editUserProfile = (req, res) => {
  console.log('editUserProfile');
  res.send('editUserProfile');
};

module.exports = { createUser, loginUser, getUserProfile, editUserProfile };