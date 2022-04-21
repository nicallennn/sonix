import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './views/non-auth-layout';
import Landing from './views/landing';
import Dashboard from './views/dashboard';
import Recipe from './views/recipe';
import Search from './views/search';
import Category from './views/category';
import Profile from './views/profile';
import NotFound from './views/not-found';

const UnauthenticatedApp = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Landing />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="recipe/:recipeId" element={<Recipe />} />
          <Route path="search" element={<Search />} />
          <Route path="category/:categoryId" element={<Category />} />
          <Route path="profile" element={<Profile />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default UnauthenticatedApp;