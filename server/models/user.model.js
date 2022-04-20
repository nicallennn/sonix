//import mongoose
const { mongoose } = require('./connection');

//define the schema
const UserSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  handle: {
    type: String,
    required: true,
    unique: true
  },
  bio: {
    type: String,
    required: false,
    default: ''
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  ownRecipes: Array,
  likedRecipes: Array,
}, {
  timestamps: { createdAt: 'joined' }
});

//create the model
const User = new mongoose.model('User', UserSchema);

//export the model
module.exports = User;