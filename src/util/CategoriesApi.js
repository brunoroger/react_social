const api = 'http://localhost:3001/categories';

const headers = {
  'Accept': 'application/json',
  'Authorization': 'whatever-you-want'
};

export const getAll = () =>
  fetch(api, { headers })
    .then(res => res.json())
    .then(data => data.categories);