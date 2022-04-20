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
    required: true
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
}, {
  timestamps: { createdAt: 'joined' }
});

//create the model
const User = new mongoose.model('User', UserSchema);

//export the model
module.exports = User;