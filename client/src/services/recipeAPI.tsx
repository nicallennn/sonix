const rootUrl = 'http://localhost:3001';

//! get requests

const getDashboardRecipes = () => {
  return fetch(`${rootUrl}/dashboard`)
    .then((res) => {
      res.status > 400 ? Promise.reject(res) : res;
    })
    .then((res) => res.json())
    .catch((err) => console.log('Failed to fetch category recipes', err));
};

const getCategoryRecipes = (category: string) => {
  return fetch(`${rootUrl}/category/${category}`)
    .then((res) => (res.status > 400 ? Promise.reject(res) : res))
    .then((res) => res.json())
    .catch((err) => console.log('Failed to fetch category recipes', err));
};

const searchAllRecipes = (searchTerm: string) => {
  return fetch(`${rootUrl}/searchAll/${searchTerm}`)
    .then((res) => (res.status > 400 ? Promise.reject(res) : res))
    .then((res) => res.json())
    .catch((err) => console.error('Failed to fetch category recipes: ', err));
};

const getRecipe = (id: string) => {
  return fetch(`${rootUrl}/recipe/${id}`)
    .then((res) => (res.status > 400 ? Promise.reject(res) : res))
    .then((res) => res.json())
    .catch((error) => {
      console.error('Failed to fetch recipe: ', error);
    });
};

const likeRecipe = (recipeId: string) => {
  const token = localStorage.getItem('accessToken');
  return fetch(`${rootUrl}/recipe/like/${recipeId}`, {
    method: 'PATCH',
    credentials: 'include',
    mode: 'cors',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
    .then((res) => {
      if (res.status === 200) return { liked: true };
      else return { liked: false };
    })
    .catch((error) => {
      console.error('Failed to like recipe: ', error);
      return error;
    });
};

const unlikeRecipe = (recipeId: string) => {
  const token = localStorage.getItem('accessToken');
  return fetch(`${rootUrl}/recipe/unlike/${recipeId}`, {
    method: 'PATCH',
    credentials: 'include',
    mode: 'cors',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
    .then(async (res) => {
      if (res.status === 200) return { unliked: true };
      else return { unliked: false };
    })
    .catch((error) => {
      console.error('Failed to unlike recipe: ', error);
      return error;
    });
};

//! post requests
const createRecipe = (recipe: string) => {
  const token = localStorage.getItem('accessToken');
  return fetch(`${rootUrl}/recipe/create`, {
    method: 'POST',
    credentials: 'include',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(recipe),
  })
    .then((res) => {
      const data = res.json();
      if (res.status === 201) return { created: true, data };
    })
    .catch((error) => {
      console.error('Failed to create recipe: ', error);
      return error;
    });
};

const getProfileRecipes = (recipeIds: string) => {
  return fetch(`${rootUrl}/recipe/user`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(recipeIds),
  })
    .then((res) => {
      const data = res.json();
      if (res.status === 200) return { fetched: true, data };
    })
    .catch((error) => {
      console.error('Failed to create recipe: ', error);
      return error;
    });
};

export {
  getDashboardRecipes,
  getCategoryRecipes,
  getRecipe,
  createRecipe,
  likeRecipe,
  unlikeRecipe,
  getProfileRecipes,
  searchAllRecipes,
};
