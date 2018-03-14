const api = 'http://localhost:3001/posts';

const headers = {
  'Accept': 'application/json',
  'Authorization': 'whatever-you-want'
};

export const getAll = (idPost) =>
  fetch(api + '/' + idPost + '/comments', { headers })
    .then(res => res.json());