const fs = require('fs');

const creators = ['Tim', 'Jim', 'Slim', 'John'];
const categories = ['Bass', 'Pad', 'String', 'Lead', 'Pluck', 'FX', 'Keys'];
const descriptions = [
  'Quidem et reprehenderit nostrum saepe, consequatur odio?',
  'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Beatae, commodi?',
  'Lorem ipsum dolor sit amet consectetur adipisicing elit.'
];

const originalSynths = ['Serum', 'Massive', 'Vital', 'FM8', 'Absynth', 'Any'];
const previews = 'http://somepreviewthing.co.uk/lndf89f89h3fs';
const possibleTags = ['Light', 'Dark', 'Airy', 'Cinematic', 'Soft', 'Heavy', 'Sharp', 'FX'];
const possibleIngredients = ['LPF', 'HPF', 'Oscillator', 'Reverb', 'Delay', 'EQ', 'Distortion', 'Phaser', 'Chorus'];
const recipeMethod = [
  'Set the osciallator to a sine wave',
  'Set the osciallator to a saw wave',
  'Set the osciallator to a square wave',
  'Add the LPF and set the cutoff to 100hz',
  'Add the HPF and set the cutoff to 500hz',
  'Add a short reverb',
  'Add a long reverb',
  'Add a delay with 1ms rate',
  'Add a delay with a 1/8 sync rate',
  'Add distortion and set the mix to around 50%',
  'Add a chorus',
  'Use the EQ to filter out the low bass',
  'Use the EQ to filter out the top end around 1khz'
];

const randomNumber = (end, precision = 0) => {
  return (Math.random() * end).toFixed(precision);
};

const createRecipe = () => {
  const create = creators[randomNumber(3)];
  const category = categories[randomNumber(6)];
  const title = category + ' ' + randomNumber(18);
  const description = descriptions[randomNumber(2)];
  const rating = randomNumber(5, 2);
  const originalSynth = originalSynths[randomNumber(5)];
  const preview = previews;
  const tags = [];

  for (let i = 0; i < randomNumber(3) + 1; i++) {
    const tag = (possibleTags[randomNumber(7)]);
    if (tags.includes(tag)) continue;
    tags.push(tag);
  }

  const ingredients = ['Oscillator'];
  for (let i = 0; i < randomNumber(4) + 1; i++) {
    const ingredient = (possibleIngredients[randomNumber(7)]);
    if (ingredients.includes(ingredient)) continue;
    ingredients.push(ingredient);
  }

  const method = [];
  for (let i = 0; i < randomNumber(8) + 1; i++) {
    const step = (recipeMethod[randomNumber(7)]);
    if (method.includes(step)) continue;
    method.push(step);
  }

  const recipe = {
    creator: create,
    title: title,
    description: description,
    rating: rating,
    category: category,
    originalSynth: originalSynth,
    preview: preview,
    tags: tags,
    ingredients: ingredients,
    recipeMethod: method
  };

  return recipe;
};

const mockRecipes = [];

for (let i = 0; i < 50; i++) {
  mockRecipes.push(createRecipe());
}

console.log(mockRecipes);

fs.writeFileSync('mock-data.json', JSON.stringify(mockRecipes));

