import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setDashboardRecipes } from './state/actions';
import { useEffect } from 'react';

//! custom functions/data
import { getDashboardRecipes } from './services/recipeAPI';

//! views/components/data
import Layout from './views/auth-layout';
import Landing from './views/landing';
import Dashboard from './views/dashboard';
import Recipe from './views/recipe';
import CreateRecipe from './views/create-recipe';
import Search from './views/search';
import Category from './views/category';
import Profile from './views/profile';
import NotFound from './views/not-found';

const AuthenticatedApp = () => {

  const dispatch = useDispatch();

  useEffect(() => {
    //todo - check user token is valid & fetch user profile

    //! get the dashboard recipes
    getDashboardRecipes().then(
      res => {
        if (res.fetched) dispatch(setDashboardRecipes(res.data));
        //todo - show error message to user
      }
    ).catch((error) => {
      console.log('Error:', error);
    });
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          {/* <Route index element={<Landing />} /> */}
          <Route index element={<Dashboard />} />
          <Route path="recipe" element={<Recipe />} />
          <Route path="create" element={<CreateRecipe />} />
          <Route path="search" element={<Search />} />
          <Route path="category/:id" element={<Category />} />
          <Route path="profile" element={<Profile />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default AuthenticatedApp;