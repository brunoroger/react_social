import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App';
import {BrowserRouter} from 'react-router-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import reducer from './reducers/index';

document.title = 'React Social';

const store = createStore(reducer);

ReactDOM.render(
	<Provider store={store}>
		<BrowserRouter><App /></BrowserRouter>
	</Provider>,
	document.getElementById('root')
);