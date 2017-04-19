import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import ReduxThunk from 'redux-thunk'
import ReduxFreeze from 'redux-freeze'
import { createStore, applyMiddleware } from 'redux'
import serviceDetailsReducer from '../reducers/serviceDetailsReducer';

import Home from './Home';
import styles from '../styles/global.css';

const store = createStore( serviceDetailsReducer, { loading: true, data: [] }, applyMiddleware( ReduxThunk, ReduxFreeze ) );
 
document.addEventListener('DOMContentLoaded', function() {
	ReactDOM.render(
		<Provider store={store}>
			<Home/>
		</Provider>,
		document.getElementById('mount')
	);
});
