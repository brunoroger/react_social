const api = 'http://localhost:3001/posts';
const apiAdd = 'http://localhost:3001/comments';

const headers = {
  'Accept': 'application/json',
  'Authorization': 'whatever-you-want'
};

export const getAll = (idPost) =>
fetch(api + '/' + idPost + '/comments', { headers })
.then(res => res.json());

export const add = (comment) =>
fetch(apiAdd,{
	method: 'POST',
	headers: {
	  ...headers,
	  'Content-Type': 'application/json'
	},
	body: JSON.stringify(comment)
}).then(res => res.json());