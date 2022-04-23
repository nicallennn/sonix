import { useForm, useFieldArray } from 'react-hook-form';
import { storage } from '../services/firebase';
import { uploadBytes, ref, getDownloadURL, listAll } from 'firebase/storage';

import { createRecipe } from '../services/recipeAPI';
import styles from './styles/create-recipe.scss';
import { useState } from 'react';

const CreateRecipe = () => {
  // state
  const [uploadMessage, setUploadMessage] = useState(null);
  const [resultMessage, setResultMessage] = useState(null);

  // react hook forms
  const { register, control, handleSubmit, reset, watch } = useForm({
    defaultValues: {
      tags: [{ value: '' }],
      ingredients: [{ value: '' }],
      steps: [{ step: '' }]
    }
  });

  //ingredients field array
  const {
    fields: ingredients,
    append: ingredientsAppend,
    // remove: ingredientsRemove,
  } = useFieldArray({
    control,
    name: 'ingredients'
  });

  //method field array
  const {
    fields: steps,
    append: stepsAppend,
    // remove: stepsRemove,
  } = useFieldArray({
    control,
    name: 'steps'
  });

  const {
    fields: tags,
    append: tagsAppend,
    // remove: tagsRemove,
  } = useFieldArray({
    control,
    name: 'tags'
  });


  //! get form data, save file to firebase, create recipe object, add to local recipies, store inbox
  const onSubmit = async data => {
    // console.log('submit data', data);
    //make the document to store
    const file = data.sampleFile[0];

    //get the filename
    const filename = data.sampleFile[0].name;
    // console.log(filename);

    //todo check if the file exists already or create unique filename for each file?
    let filepath;
    // try to upload the audio to firebase
    try {
      //create the reference
      const storageRef = ref(storage, `samples/one/${filename}`);
      //store the data
      await uploadBytes(storageRef, file);
      //get the download link to display on the page
      filepath = await getDownloadURL(ref(storage, `samples/one/${filename}`));
      setUploadMessage('Uploaded audio preview.');
    } catch (error) {
      setUploadMessage('Failed to upload audio!');
      return;
    }

    //build the recipe object
    const recipe = {
      //get creator handle and id on server from token middleware
      creatorHandle: 'timmy232',
      creatorId: '62614e1b7376e350dd94d4d9',
      title: data.title,
      description: data.description,
      category: data.category,
      originalSynth: data.originalSynth,
      preview: filepath,
      tags: data.tags.map(tag => tag.value),
      ingredients: data.ingredients.map(ing => ing.value),
      recipeMethod: data.steps.map(step => step.step)
    };

    // add to recipe to the database
    try {
      const result = await createRecipe(recipe);
      //if added to db - add to local storage
      if (result.created) setResultMessage('Uploaded recipe to database.');
      else throw new Error();
    } catch (error) {
      setResultMessage('Failed to upload recipe to database!');
    }

    //todo - add the recipe to the redux store
  };

  return (
    <div className="create-recipe-wrapper">
      <form className="create-form" onSubmit={handleSubmit(onSubmit)}>

        {/* details */}
        <div className="recipe-section recipe-details">
          <label htmlFor="recipe-details">Recipe Details</label>
          <input type="text" {...register('title')} placeholder="title" />
          <input type="text" {...register('description')} placeholder="description" />
          <input type="text" {...register('originalSynth')} placeholder="synth" />

          <select {...register('category')}>
            <option value="" disabled selected hidden>Category</option>
            <option value="Bass">Bass</option>
            <option value="Pad">Pad</option>
            <option value="Lead">Lead</option>
            <option value="FX">FX</option>
            <option value="Keys">Keys</option>
            <option value="Pluck">Pluck</option>
            <option value="String">String</option>
            <option value="Other">Other</option>
          </select>

          {tags.map((field, index) => (
            <input
              key={field.id} // important to include key with field's id
              placeholder="tag (one per input)"
              {...register(`tags.${index}.value`)}
            />
          ))}
          <button
            className="add-btn"
            type="button"
            onClick={() => {
              tagsAppend({ value: '' });
            }}
          >
            +
          </button>

          <input type="file" {...register('sampleFile')} />
        </div>

        {/* ingredients */}
        <div className="recipe-section recipe-ingredients">
          <label htmlFor="ingredients">Ingredients</label>
          {ingredients.map((field, index) => (
            <input
              key={field.id} // important to include key with field's id
              {...register(`ingredients.${index}.value`)}
            />
          ))}
          <button
            className="add-btn"
            type="button"
            onClick={() => {
              ingredientsAppend({ value: '' });
            }}
          >
            +
          </button>
        </div>
        {/* method */}
        <div className="recipe-section recipe-method">
          <label htmlFor="steps">Method</label>
          {steps.map((field, index) => (
            <textarea rows="3" key={field.id} {...register(`steps.${index}.step`)} ></textarea>
          ))}
          <button
            className="add-btn"
            type="button"
            onClick={() => {
              stepsAppend({ step: '' });
            }}
          >
            +
          </button>
          <input className="submit-btn" type="submit" />
          {uploadMessage && <p className="recipe-upload-status">{uploadMessage}</p>}
          {resultMessage && <p className="recipe-upload-status">{resultMessage}</p>}
        </div>
      </form>
    </div>
  );
};

export default CreateRecipe;