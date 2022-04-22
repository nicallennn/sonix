import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

import styles from './styles/recipe.scss';
import PlayIcon from '../assests/icons/play.svg';
import PauseIcon from '../assests/icons/pause.svg';

import { getRecipe } from '../services/recipeAPI';

const Recipe = () => {

  const { state } = useLocation();
  const [recipe, setRecipe] = useState(null);
  const [playing, setPlaying] = useState(false);
  const [player, setPlayer] = useState(null);
  const sample = 'https://firebasestorage.googleapis.com/v0/b/sonix-test.appspot.com/o/samples%2Frising_pad.wav?alt=media&token=2694cf74-1f10-4779-ae93-ed470af6e974';

  console.log('load ', state.recipeId);

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

  useEffect(() => {
    window.scrollTo(0, 0);
    console.log('getting recipe');
    //get the recipe details from the server
    getRecipe(state.recipeId).then(res => {
      if (res.fetched) setRecipe(res.data);
      setPlayer(document.getElementById(`${recipe.category}-${recipe._id}-player`));
      //todo - show error message to user
    }).catch(error => {
      console.error(error);
    });

  }, []);

  return (
    <div className="recipe-wrapper">
      {/* display recipe information */}

      {recipe && <div className="preview-container">
        <div className={recipe.category + ' player'}>
          <button className="player-button" onClick={handlePlayAudio}>
            <img className="playing-icon" src={playing ? PauseIcon : PlayIcon}></img>
          </button>
          <audio crossOrigin="anonymous" id={`${recipe.category}-${recipe._id}-player`} src={sample} onEnded={trackEnded}>
          Your browser does not support the audio element.
          </audio>
        </div>
        <div className="recipe-information">
          <h3 className="title">{recipe.title}</h3>
          <p className="synth-name">{recipe.originalSynth}</p>
          <div className="tags">
            {recipe && recipe.tags.map(tag => <p key={tag} className="tag">{tag}</p>)}
          </div>
          <p className="creator">{recipe.creatorHandle}</p>
          <p className="likes">Likes: {recipe.numberOfLikes}</p>
          <p className="description">{recipe.description}</p>
        </div>
      </div>}
      
    </div>
  );
};

export default Recipe;