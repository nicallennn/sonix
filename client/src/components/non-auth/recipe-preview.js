import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';


//! styles and assets
import styles from './styles/recipe-preview.scss';
import PlayIcon from './../../assests/icons/play.svg';
import PauseIcon from './../../assests/icons/pause.svg';

const RecipePreview = ({ recipe, category }) => {
  const likedRecipes = useSelector(state => state.profile.likedRecipes);
  const authenticated = useSelector(state => state.authenticated);

  const navigate = useNavigate();
  const [playing, setPlaying] = useState(false);
  const [player, setPlayer] = useState(null);
  const [liked, setLiked] = useState(false);

  useEffect(() => {
    //set the player
    setPlayer(document.getElementById(`${category}-${recipe._id}-player`));
    //set if user likes liked
    if (likedRecipes[recipe._id] === true) {
      setLiked(true);
    }
  }, []);

  const handlePlayAudio = async () => {
    if (playing) {
      // pause the player
      await player.pause();
      setPlaying(false);
    } else {
      //play the player
      await player.play();
      setPlaying(true);
    }
  };

  const trackEnded = () => {
    setPlaying(false);
  };

  const routeToRecipe = () => {
    navigate('/recipe', { state: { recipeId: recipe._id } });
  };

  const routeToUserProfile = () => {
    navigate('/profile', { state: { userHandle: recipe.creatorHandle } });
  };

  const handleLike = (like) => {
    if (like) {
      console.log('like this recipe');
    } else {
      console.log('unlike this recipe');
    }
  };


  return (
    <div className="recipe-preview-container">
      <div className="player-outer">
        <div className={recipe.category + ' player'}>
          <button className="player-button" onClick={handlePlayAudio}>
            <img className="playing-icon" src={playing ? PauseIcon : PlayIcon}></img>
          </button>
          <audio crossOrigin="anonymous" id={`${category}-${recipe._id}-player`} src={recipe.preview} onEnded={trackEnded}>
            Your browser does not support the audio element.
          </audio>
        </div>
      </div>
      <div className='recipe-details' id={recipe._id}>
        {authenticated &&
          <>
            {liked ?
              <button onClick={() => handleLike(false)} className='like-button'>unlike</button>
              :
              <button onClick={() => handleLike(true)} className='like-button'>like</button>
            }
          </>
        }
        <h3 className="title" onClick={routeToRecipe}>{recipe.title}</h3>
        <p className="synth-name">{recipe.originalSynth}</p>
        <p className="user" onClick={routeToUserProfile}>{recipe.creatorHandle}</p>
        <p className="likes">Likes: {recipe.numberOfLikes}</p>
        <p className="description">{recipe.description.substring(0, 50)}...</p>

      </div>
    </div>
  );
};

export default RecipePreview;