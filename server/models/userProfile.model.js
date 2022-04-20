//import mongoose
const { mongoose } = require('./connection');

//define the schema
const UserProfileSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId, ref: 'User',
    required: true
  },
  handle: {
    type: String,
    required: true,
  },
  profilePic: {
    type: String,
    default: ''
  },
  bio: {
    type: String,
    default: ''
  },
  soundcloudLink: {
    type: String,
    default: ''
  },
  ownRecipes: Array,
  likedRecipes: Array,
});

//create the model
const UserProfile = new mongoose.model('Profile', UserProfileSchema);

//export the model
module.exports = UserProfile;