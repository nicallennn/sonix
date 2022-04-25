import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

import { getUserProfile } from '../services/userAPI';
import { getProfileRecipes } from '../services/recipeAPI';
import RecipeScrollContainer from '../components/non-auth/recipe-scroll-container';
import './styles/profile.scss';

const Profile = () => {
  const { state } = useLocation();
  const [profile, setProfile] = useState(null);
  const [recipes, setRecipes] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    if (!state.userHandle) return;
    //get the users profile info and recipe data
    getUserProfile(state.userHandle).then(res => {
      if (res.fetched) {
        setProfile(res.data);
        // get user liked and own recipes
        getProfileRecipes({
          own: res.data.ownRecipes,
          liked: res.data.likedRecipes
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
      } else {
        console.log('Could not get user profile!');
      }
    }).catch(error => console.log(error));

    //get the users profile recipes

  }, []);


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

export default Profile;