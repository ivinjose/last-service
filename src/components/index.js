import React from 'react';
import ReactDOM from 'react-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { Provider } from 'react-redux';
import ReduxThunk from 'redux-thunk'
import ReduxFreeze from 'redux-freeze'
import { createStore, applyMiddleware } from 'redux'
import { Router, Route, browserHistory } from 'react-router';
import serviceDetailsReducer from '../reducers/serviceDetailsReducer';
import styles from '../styles/global.css';
import Home from './Home';
import ViewServiceDetails from './ViewServiceDetails';
import AddServiceDetails from './AddServiceDetails';
import initialState from '../state/initialState';

const store = createStore( serviceDetailsReducer, initialState, applyMiddleware( ReduxThunk, ReduxFreeze ) );

const Root = () => (
	<Provider store={store}>
		<MuiThemeProvider>
			<Router history={browserHistory}>
				<Route path="/" component={Home} />
				<Route path="/add" component={AddServiceDetails} />
				<Route path="/view" component={ViewServiceDetails} />
			</Router>
		</MuiThemeProvider>
	</Provider>
);
 
document.addEventListener('DOMContentLoaded', function() {
	ReactDOM.render(
		<Root />,
		document.getElementById('mount')
	);
});