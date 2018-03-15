const api = 'http://localhost:3001/posts';

const headers = {
  'Accept': 'application/json',
  'Authorization': 'whatever-you-want'
};

export const getAll = () =>
fetch(api, { headers })
.then(res => res.json());

export const add = (post) =>
fetch(api,{
	method: 'POST',
	headers: {
	  ...headers,
	  'Content-Type': 'application/json'
	},
	body: JSON.stringify(post)
}).then(res => res.json());

export const edit = (id, post) =>
fetch(api +'/'+ id, {
	method: 'PUT',
	headers: {
	  ...headers,
	  'Content-Type': 'application/json'
	},
	body: JSON.stringify(post)
}).then(res => res.json());

export const remove = (id) =>
fetch(api +'/'+ id, {
	method: 'DELETE',
	headers
}).then(res => res.json());