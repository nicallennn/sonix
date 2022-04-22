import styles from './styles/recipe-preview.scss';

const RecipePreview = ({ recipe }) => {
  console.log();
  return (
    <div className="recipe-preview-container">
      <div className='player'>
        player
      </div>
      <div className='recipe-details'>
        <h3 className="title">{recipe.title}</h3>
        <p className="synth-name">{recipe.originalSynth}</p>
        <p className="likes">Likes: {recipe.numberOfLikes}</p>
        <p className="description">{recipe.description}</p>

      </div>
    </div>
  );
};

export default RecipePreview;