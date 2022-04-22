import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

//! styles and assets
import styles from './styles/recipe-preview.scss';
import PlayIcon from './../../assests/icons/play.svg';
import PauseIcon from './../../assests/icons/pause.svg';

const RecipePreview = ({ recipe }) => {
  const navigate = useNavigate();
  const [playing, setPlaying] = useState(false);

  const handlePlayAudio = () => {


    if (playing) {
      // pause the player
      console.log('stop playing');
      setPlaying(false);
    } else {
      //play the player
      console.log('start playing');
      setPlaying(true);
    }



  };

  const routeToRecipe = () => {
    navigate('/recipe', { state: { recipeId: recipe._id } });
  };

  return (
    <div className="recipe-preview-container">
      <div className='player'>
        <button className='player-button' onClick={handlePlayAudio}>
          <img className="playing-icon" src={playing ? PauseIcon : PlayIcon}></img>
        </button>
      </div>
      <div className='recipe-details' id={recipe._id} onClick={routeToRecipe}>
        <h3 className="title">{recipe.title}</h3>
        <p className="synth-name">{recipe.originalSynth}</p>
        <p className="likes">Likes: {recipe.numberOfLikes}</p>
        <p className="description">{recipe.description}</p>

      </div>
    </div>
  );
};

export default RecipePreview;