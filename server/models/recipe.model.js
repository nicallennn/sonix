//import mongoose
const { mongoose } = require('./connection');

//define the schema
const RecipeSchema = new mongoose.Schema({
  creator: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: false
  },
  rating: {
    type: Number,
    required: true
  },
  category: {
    type: String,
    enum: ['Bass', 'Pad', 'String', 'Lead', 'Pluck', 'FX', 'Keys'],
    required: true
  },
  originalSynth: {
    type: String,
    required: false,
    default: ''
  },
  preview: {
    type: String,
    required: true
  },
  tags: Array,
  ingredients: {
    type: Array,
    required: true
  },
  recipeMethod: {
    type: Array,
    required: true
  }
}, {
  timestamps: { createdAt: 'created' }
});

//create the model
const Recipe = new mongoose.model('Recipe', RecipeSchema);

//export the model
module.exports = Recipe;