import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { searchId } from './util/helper';
import reducer from './reducers/index';

document.title = 'React Social';

const store = createStore(reducer);

const array = [
	{
		id: 1,
		nome: 'joao'
	},
	{
		id: 2,
		nome: 'teste'
	},
	{
		id: 3,
		nome: 'ricardo'
	}
];

console.log(searchId(array, 1));

ReactDOM.render(
	<Provider store={store}>
		<App />
	</Provider>,
	document.getElementById('root')
);