import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

import { getRecipe } from '../services/recipeAPI';

const Recipe = () => {
  const { state } = useLocation();
  const [recipe, setRecipe] = useState({});

  useEffect(() => {
    window.scrollTo(0, 0);
    //get the recipe details from the server
    getRecipe(state.recipeId).then(res => {
      console.log(res.data);
      if (res.fetched) setRecipe(res.data);
      //todo - show error message to user
    }).catch(error => {
      console.error(error);
    });

  }, []);

  return (
    <>
      <h1>Recipe</h1>
      <p>ID: {state.recipeId}</p>
      <p>{recipe.title}</p>
    </>
  );
};

export default Recipe;