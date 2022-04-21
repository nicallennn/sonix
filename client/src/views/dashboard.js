import { getDashboardRecipes } from '../services/recipeAPI';
import { useEffect } from 'react';
const Dashboard = () => {

  useEffect(() => {
    getDashboardRecipes().then(
      res => console.log(res)
    ).catch((error) => {
      console.log('Error:', error);
    });
  });

  return (
    <h1>Dashboard</h1>
  );
};

export default Dashboard;