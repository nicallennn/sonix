import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

import { getUserProfile } from '../services/userAPI';

const Profile = () => {
  const { state } = useLocation();
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    if (!state.userHandle) return;
    getUserProfile(state.userHandle).then(res => {
      if (res.fetched) {
        setProfile(res.data);
      } else {
        console.log('Could not get user profile');
      }
    });

  }, []);
  return (
    <>
      {profile &&
        <>
          <h1>{profile.handle}s Profile</h1>
          <p>{profile.bio}</p>
        </>
      }
    </>
  );
};

export default Profile;