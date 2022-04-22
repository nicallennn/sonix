const rootUrl = 'http://localhost:3001';

//! get requests

//! post requests
const createUser = async (newUser) => {
  return fetch(`${rootUrl}/register`, {
    method: 'POST',
    credentials: 'include',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(newUser),
  })
    .then(async (res) => {
      const data = await res.json();
      if (res.status === 201) return { fetched: true, data };
      else return { fetched: false, error: data };
    })
    .catch((error) => console.error(error));
};

const loginUser = (user) => {
  return fetch(`${rootUrl}/login`, {
    method: 'POST',
    credentials: 'include',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(user),
  })
    .then(async (res) => {
      const data = await res.json();
      if (res.status === 200) return { fetched: true, data };
      else return { fetched: false, error: data };
    })
    .catch((error) => console.error(error));
};


export { createUser, loginUser };