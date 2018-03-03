import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { addPost } from './actions';
import reducer from './reducers/index.js';

document.title = 'React Social';

const store = createStore(reducer);

console.log(store.getState());

store.subscribe(() => console.log('alterando........'));

console.log('começando o envio da ação');

store.dispatch( addPost({ title: 'React Redux', id: 1 }) );

console.log(store.getState());

ReactDOM.render(
	<Provider store={store}>
		<App />
	</Provider>,
	document.getElementById('root')
);