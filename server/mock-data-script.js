const { createDiffieHellman } = require('crypto');
const fs = require('fs');


//firebase uploads

const fb = {
  Bass: [
    'https://firebasestorage.googleapis.com/v0/b/sonix-a4ed2.appspot.com/o/samples%2Fwobble.mp3497fd811-aa36-4f7f-9136-f97e38825b8811%3A11%3A10?alt=media&token=08eec009-d311-47ed-8d95-009ebd642e38',
    'https://firebasestorage.googleapis.com/v0/b/sonix-a4ed2.appspot.com/o/samples%2Fbass7.wave5e17a40-bc76-453a-bee5-58b67e5590df11%3A34%3A17?alt=media&token=43540192-ff47-4e96-9f59-991e7349e1d7',
    'https://firebasestorage.googleapis.com/v0/b/sonix-a4ed2.appspot.com/o/samples%2Ffilter_wobble_bass.wav130cc928-894d-4dea-bc2f-6e7bede8cb3511%3A35%3A01?alt=media&token=8774ee21-6c3a-40b4-b5e6-ca1bd11caada',
    'https://firebasestorage.googleapis.com/v0/b/sonix-a4ed2.appspot.com/o/samples%2Ffm.wavcc1783f0-c568-4fad-850c-57bdcf621c6711%3A35%3A22?alt=media&token=d2cc3922-9aa0-42c1-8367-5c14cc4def58',
    'https://firebasestorage.googleapis.com/v0/b/sonix-a4ed2.appspot.com/o/samples%2Fliquid_reese.wav10e04983-9f5d-4621-8602-f6fe8fc9595b11%3A35%3A46?alt=media&token=3e69004a-5102-44aa-abf9-c5b262253b2c',
  ],

  Pad: [
    'https://firebasestorage.googleapis.com/v0/b/sonix-a4ed2.appspot.com/o/samples%2Fpad1.wav467febef-b24d-4f81-9b7e-75874865884511%3A37%3A25?alt=media&token=ef00f2d7-cdd3-466f-9f8a-f6091a8da272',
    'https://firebasestorage.googleapis.com/v0/b/sonix-a4ed2.appspot.com/o/samples%2Fpad2.wavb0b5c10f-ca0d-497e-b5ff-754b9a75151c11%3A37%3A50?alt=media&token=e09a5af7-1c16-4045-9ddd-28730891f815',
    'https://firebasestorage.googleapis.com/v0/b/sonix-a4ed2.appspot.com/o/samples%2Fpad3.wavd3d8471c-b9c1-4a82-8529-9d566be1259111%3A38%3A06?alt=media&token=2dce5c55-94e2-4ecb-b75c-a790e29aadff',
    'https://firebasestorage.googleapis.com/v0/b/sonix-a4ed2.appspot.com/o/samples%2Fpad4.wav608a0b3c-0914-436a-8353-5627ebbd938a11%3A38%3A23?alt=media&token=6eda6db8-ba74-400a-a403-66322725592a'
  ],

  String: [
    'https://firebasestorage.googleapis.com/v0/b/sonix-a4ed2.appspot.com/o/samples%2Fpad1.wav467febef-b24d-4f81-9b7e-75874865884511%3A37%3A25?alt=media&token=ef00f2d7-cdd3-466f-9f8a-f6091a8da272',
    'https://firebasestorage.googleapis.com/v0/b/sonix-a4ed2.appspot.com/o/samples%2Fpad2.wavb0b5c10f-ca0d-497e-b5ff-754b9a75151c11%3A37%3A50?alt=media&token=e09a5af7-1c16-4045-9ddd-28730891f815',
    'https://firebasestorage.googleapis.com/v0/b/sonix-a4ed2.appspot.com/o/samples%2Fpad3.wavd3d8471c-b9c1-4a82-8529-9d566be1259111%3A38%3A06?alt=media&token=2dce5c55-94e2-4ecb-b75c-a790e29aadff',
    'https://firebasestorage.googleapis.com/v0/b/sonix-a4ed2.appspot.com/o/samples%2Fpad4.wav608a0b3c-0914-436a-8353-5627ebbd938a11%3A38%3A23?alt=media&token=6eda6db8-ba74-400a-a403-66322725592a'
  ],

  Lead: [
    'https://firebasestorage.googleapis.com/v0/b/sonix-a4ed2.appspot.com/o/samples%2Flead.wav85e62a96-c9df-4a71-900d-a0d3bdd858fe11%3A38%3A54?alt=media&token=500d5adb-8aef-4a78-a214-2216fb1f2faa',
    'https://firebasestorage.googleapis.com/v0/b/sonix-a4ed2.appspot.com/o/samples%2Flead2.wav693b83ee-d830-4f67-8daa-7a192d5e886d11%3A39%3A09?alt=media&token=f0444b43-92d9-433e-add1-da772aa57b0f',
    'https://firebasestorage.googleapis.com/v0/b/sonix-a4ed2.appspot.com/o/samples%2Flead3.wavd2280603-37df-432c-b267-71dfa9e29af611%3A39%3A24?alt=media&token=fedaa370-ef92-423a-b479-2feced237e9b',
    'https://firebasestorage.googleapis.com/v0/b/sonix-a4ed2.appspot.com/o/samples%2Flead.wav85e62a96-c9df-4a71-900d-a0d3bdd858fe11%3A38%3A54?alt=media&token=500d5adb-8aef-4a78-a214-2216fb1f2faa',

  ],

  Pluck: [
    'https://firebasestorage.googleapis.com/v0/b/sonix-a4ed2.appspot.com/o/samples%2Flead.wav85e62a96-c9df-4a71-900d-a0d3bdd858fe11%3A38%3A54?alt=media&token=500d5adb-8aef-4a78-a214-2216fb1f2faa',
    'https://firebasestorage.googleapis.com/v0/b/sonix-a4ed2.appspot.com/o/samples%2Flead2.wav693b83ee-d830-4f67-8daa-7a192d5e886d11%3A39%3A09?alt=media&token=f0444b43-92d9-433e-add1-da772aa57b0f',
    'https://firebasestorage.googleapis.com/v0/b/sonix-a4ed2.appspot.com/o/samples%2Flead3.wavd2280603-37df-432c-b267-71dfa9e29af611%3A39%3A24?alt=media&token=fedaa370-ef92-423a-b479-2feced237e9b',
    'https://firebasestorage.googleapis.com/v0/b/sonix-a4ed2.appspot.com/o/samples%2Flead.wav85e62a96-c9df-4a71-900d-a0d3bdd858fe11%3A38%3A54?alt=media&token=500d5adb-8aef-4a78-a214-2216fb1f2faa',

  ],


  FX: [
    'https://firebasestorage.googleapis.com/v0/b/sonix-a4ed2.appspot.com/o/samples%2Frise1.wav9566343f-9014-44ca-b81f-5837e1374d0c11%3A40%3A30?alt=media&token=6cfe77d9-747d-4707-a144-c2df1e10d4dd',
    'https://firebasestorage.googleapis.com/v0/b/sonix-a4ed2.appspot.com/o/samples%2Frise2.wavc242340f-29ab-4883-a6c1-4d57ce8736fc11%3A40%3A45?alt=media&token=44494a8a-20e1-4f69-9f1f-421fae95eeb5',
    'https://firebasestorage.googleapis.com/v0/b/sonix-a4ed2.appspot.com/o/samples%2Frise1.wav9566343f-9014-44ca-b81f-5837e1374d0c11%3A40%3A30?alt=media&token=6cfe77d9-747d-4707-a144-c2df1e10d4dd',
    'https://firebasestorage.googleapis.com/v0/b/sonix-a4ed2.appspot.com/o/samples%2Frise2.wavc242340f-29ab-4883-a6c1-4d57ce8736fc11%3A40%3A45?alt=media&token=44494a8a-20e1-4f69-9f1f-421fae95eeb5'
  ],

  Other: [
    'https://firebasestorage.googleapis.com/v0/b/sonix-a4ed2.appspot.com/o/samples%2Frise1.wav9566343f-9014-44ca-b81f-5837e1374d0c11%3A40%3A30?alt=media&token=6cfe77d9-747d-4707-a144-c2df1e10d4dd',
    'https://firebasestorage.googleapis.com/v0/b/sonix-a4ed2.appspot.com/o/samples%2Frise2.wavc242340f-29ab-4883-a6c1-4d57ce8736fc11%3A40%3A45?alt=media&token=44494a8a-20e1-4f69-9f1f-421fae95eeb5',
    'https://firebasestorage.googleapis.com/v0/b/sonix-a4ed2.appspot.com/o/samples%2Frise1.wav9566343f-9014-44ca-b81f-5837e1374d0c11%3A40%3A30?alt=media&token=6cfe77d9-747d-4707-a144-c2df1e10d4dd',
    'https://firebasestorage.googleapis.com/v0/b/sonix-a4ed2.appspot.com/o/samples%2Frise2.wavc242340f-29ab-4883-a6c1-4d57ce8736fc11%3A40%3A45?alt=media&token=44494a8a-20e1-4f69-9f1f-421fae95eeb5'
  ],

  Keys: [
    'https://firebasestorage.googleapis.com/v0/b/sonix-a4ed2.appspot.com/o/samples%2Fkey1.wav48bbc2ff-af6b-44df-af4a-790c8d407b0711%3A41%3A22?alt=media&token=653a14f2-968b-41d3-83fc-09a43fd71b04',
    'https://firebasestorage.googleapis.com/v0/b/sonix-a4ed2.appspot.com/o/samples%2Fkey2.wavb9f80abc-dba0-4e5a-8308-55fe7cc2686411%3A41%3A45?alt=media&token=99f2a2e6-4594-4ae3-9b85-6cabf28e37ab',
    'https://firebasestorage.googleapis.com/v0/b/sonix-a4ed2.appspot.com/o/samples%2Fkey3.wav06d33c1f-8162-4115-8ce9-c9cf21af742711%3A42%3A07?alt=media&token=6befe74d-9182-47a0-aa78-119417db6816',
    'https://firebasestorage.googleapis.com/v0/b/sonix-a4ed2.appspot.com/o/samples%2Flead.wav85e62a96-c9df-4a71-900d-a0d3bdd858fe11%3A38%3A54?alt=media&token=500d5adb-8aef-4a78-a214-2216fb1f2faa',
  ]
};

const creators = ['Tim', 'Jim', 'Slim', 'John'];
const creatorsId = ['6265353ea1d54bd59acc4ae3', '62653558a1d54bd59acc4af7', '62653588a1d54bd59acc4b0b', '626535a2a1d54bd59acc4b1f'];
const creatorsHandle = ['timmy232', 'jimmy_dow', 'slimslim', 'johnny-doe'];
const categories = ['Bass', 'Pad', 'String', 'Lead', 'Pluck', 'FX', 'Keys'];
const descriptions = [
  'Quidem et reprehenderit nostrum saepe, consequatur odio?',
  'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Beatae, commodi?',
  'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
  'Itaque, ab expedita deserunt praesentium molestias possimus ipsam nam neque vero est nesciunt veniam maxime hic eligendi similique quibusdam autem! Modi commodi sed iure vel quod maxime assumenda adipisci,'
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

const tags = ['Bright', 'Airy', 'Deep', 'FX', 'Dark', 'Cinematic', 'Ghostly', 'Ambient'];

const randomNumber = (end, precision = 0) => {
  return (Math.random() * end).toFixed(precision);
};

const createRecipe = () => {

  let tagsEnd = randomNumber(7);
  let tagsStart = randomNumber(tagsEnd);
  let recipeTags = tags.slice(tagsStart, tagsEnd);

  const userNo = randomNumber(3);
  const create = creatorsHandle[userNo];
  const createId = creatorsId[userNo];
  const category = categories[randomNumber(6)];
  recipeTags.push(category);
  const title = category + ' ' + randomNumber(18);
  const description = descriptions[randomNumber(2)];
  const originalSynth = originalSynths[randomNumber(5)];
  const preview = fb[category][randomNumber(4)];
  console.log('prev: ', preview);
  const noOflikes = randomNumber(4);

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
    creatorHandle: create,
    creatorId: createId,
    title: title,
    description: description,
    numberOfLikes: noOflikes,
    likedBy: [],
    category: category,
    originalSynth: originalSynth,
    preview: preview,
    tags: recipeTags,
    ingredients: ingredients,
    recipeMethod: method
  };

  return recipe;
};

const mockRecipes = [];

for (let i = 0; i < 50; i++) {
  mockRecipes.push(createRecipe());
}

// console.log(mockRecipes);

fs.writeFileSync('mock-data.json', JSON.stringify(mockRecipes));

