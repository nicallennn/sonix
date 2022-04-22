import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

//! styles and assets
import styles from './styles/recipe-preview.scss';
import PlayIcon from './../../assests/icons/play.svg';
import PauseIcon from './../../assests/icons/pause.svg';

const RecipePreview = ({ recipe, category }) => {
  const navigate = useNavigate();
  const [playing, setPlaying] = useState(false);
  const sample = 'https://firebasestorage.googleapis.com/v0/b/sonix-test.appspot.com/o/samples%2Frising_pad.wav?alt=media&token=2694cf74-1f10-4779-ae93-ed470af6e974';
  const [player, setPlayer] = useState(null);

  const handlePlayAudio = () => {
    if (playing) {
      // pause the player
      player.pause();
      setPlaying(false);
    } else {
      //play the player
      player.play();
      setPlaying(true);
    }
  };

  const trackEnded = () => {
    setPlaying(false);
  };

  const routeToRecipe = () => {
    navigate('/recipe', { state: { recipeId: recipe._id } });
  };

  useEffect(() => {
    //set the player
    setPlayer(document.getElementById(`${category}-${recipe._id}-player`));
  }, []);

  return (
    <div className="recipe-preview-container">
      <div className={recipe.category + ' player'}>
        <button className="player-button" onClick={handlePlayAudio}>
          <img className="playing-icon" src={playing ? PauseIcon : PlayIcon}></img>
        </button>
        <audio crossOrigin="anonymous" id={`${category}-${recipe._id}-player`} src={sample} onEnded={trackEnded}>
          Your browser does not support the audio element.
        </audio>
      </div>
      <div className='recipe-details' id={recipe._id} onClick={routeToRecipe}>
        <h3 className="title">{recipe.title}</h3>
        <p className="synth-name">{recipe.originalSynth}</p>
        <p className="likes">{recipe.creatorHandle}</p>
        <p className="likes">Likes: {recipe.numberOfLikes}</p>
        <p className="description">{recipe.description.substring(0, 50)}...</p>

      </div>
    </div>
  );
};

export default RecipePreview;