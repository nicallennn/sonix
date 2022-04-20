//user controller methods 
const createUser = (req, res) => {
  console.log('createUser');
  res.send('createUser');
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