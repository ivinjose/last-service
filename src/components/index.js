import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import ReduxThunk from 'redux-thunk'
import ReduxFreeze from 'redux-freeze'
import { createStore, applyMiddleware } from 'redux'
import { Router, Route, browserHistory } from 'react-router';
import serviceDetailsReducer from '../reducers/serviceDetailsReducer';
import styles from '../styles/global.css';
import Home from './Home';
import ViewServiceDetails from './ViewServiceDetails';

const store = createStore( serviceDetailsReducer, { loading: true, data: [] }, applyMiddleware( ReduxThunk, ReduxFreeze ) );

const Root = () => (
	<Provider store={store}>
		<Router history={browserHistory}>
			<Route path="/view" component={ViewServiceDetails} />
			<Route path="/" component={Home} />
		</Router>
	</Provider>
);
 
document.addEventListener('DOMContentLoaded', function() {
	ReactDOM.render(
		<Root />,
		document.getElementById('mount')
	);
});