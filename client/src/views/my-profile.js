import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import { getProfileRecipes } from '../services/recipeAPI';
import RecipeScrollContainer from '../components/non-auth/recipe-scroll-container';
import './styles/profile.scss';

const MyProfile = () => {
  const profile = useSelector(state => state.profile);
  const [recipes, setRecipes] = useState(null);


  useEffect(() => {
    window.scrollTo(0, 0);
    if (!profile.ownRecipes || !profile.likedRecipes) {
      return;
    }
    // get user liked and own recipes
    getProfileRecipes({
      own: profile.ownRecipes,
      liked: Object.keys(profile.likedRecipes)
    })
      .then(res => {
        //store the results in state
        if (res.fetched) {
          setRecipes(res.data);
        } else {
          console.log('Could not fetch recipes!');
        }
      })
      .catch(error => console.log(error));
  }, [profile]);
  return (
    <>
      {profile &&
        <div className="profile-wrapper">
          <h2 className="title">{profile.handle}</h2>
          <p className="bio">{profile.bio}</p>

          {recipes &&
            <>
              {recipes.ownRecipes.length > 0 ?
                <RecipeScrollContainer title="Recipes" data={recipes.ownRecipes} key="my-recipes" />
                :
                <h3 className="no-content">No recipes created yet.</h3>
              }
              {recipes.likedRecipes.length > 0 ?
                <RecipeScrollContainer title="Liked Recipes" data={recipes.likedRecipes} key={'liked-recipes'} />
                :
                <h3 className="no-content">No recipes liked yet</h3>
              }
            </>

          }

        </div>
      }
    </>
  );
};

export default MyProfile;