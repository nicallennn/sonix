import { useEffect, useState } from 'react';

import styles from './styles/recipe-details.scss';
import PlayIcon from '../../assests/icons/play.svg';
import PauseIcon from '../../assests/icons/pause.svg';

const RecipeDetails = ( {recipe}) => {
  const [playing, setPlaying] = useState(false);
  const [player, setPlayer] = useState(null);
  const sample = 'https://firebasestorage.googleapis.com/v0/b/sonix-test.appspot.com/o/samples%2Frising_pad.wav?alt=media&token=2694cf74-1f10-4779-ae93-ed470af6e974';


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
    setPlayer(document.getElementById(`${recipe._id}-player`));
  });

  return ( 
    
    <div className="preview-container">        
      <div className={recipe.category + ' player'}>
        <button className="player-button" onClick={handlePlayAudio}>
          <img className="playing-icon" src={playing ? PauseIcon : PlayIcon}></img>
        </button>
        <audio crossOrigin="anonymous" id={`${recipe._id}-player`} src={sample} onEnded={trackEnded}>
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
    </div>

  );
};
 
export default RecipeDetails;