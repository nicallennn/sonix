const rootUrl = 'http://localhost:3001';

//! get requests
const getDashboardRecipes = () => {
  return fetch(`${rootUrl}/dashboard`, {
    method: 'GET'
  })
    .then(async (res) => {
      const data = await res.json();
      if (res.status === 200) return { fetched: true, data };
      else return { fetched: false, error: data };
    }).catch(error => {
      console.error('Failed to fetch dashboard recipes: ', error);
    });
};

const getCategoryRecipes = async (category) => {
  return fetch(`${rootUrl}/category/${category}`, {
    method: 'GET'
  })
    .then(async (res) => {
      const data = await res.json();
      if (res.status === 200) return { fetched: true, data };
      else return { fetched: false, error: data };
    }).catch(error => {
      console.error('Failed to fetch category recipes: ', error);
    });
};

const getRecipe = (id) => {
  return fetch(`${rootUrl}/recipe/${id}`, {
    method: 'GET'
  })
    .then(async (res) => {
      const data = await res.json();
      if (res.status === 200) return { fetched: true, data };
      else return { fetched: false, error: data };
    }).catch(error => {
      console.error('Failed to fetch recipe: ', error);
    });
};

//! post requests

export { getDashboardRecipes, getCategoryRecipes, getRecipe };