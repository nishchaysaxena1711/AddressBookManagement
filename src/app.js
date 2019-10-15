import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import AppRouter from './routers/AppRouter';
import ContactDetailsStore  from './reducers/reducer.js';

const store = createStore(ContactDetailsStore);

ReactDOM.render(
	<Provider store={store}>
		<AppRouter />
	</Provider>,
	document.getElementById('app')
);