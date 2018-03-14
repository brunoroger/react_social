const api = 'http://localhost:3001/posts';

const headers = {
  'Accept': 'application/json',
  'Authorization': 'whatever-you-want'
};

export const getAll = () =>
  fetch(api, { headers })
    .then(res => res.json());