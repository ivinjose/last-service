import React from 'react';
import ReactDOM from 'react-dom';
import ReduxThunk from 'redux-thunk'
import { createStore, applyMiddleware } from 'redux'
import serviceDetailsReducer from '../reducers/serviceDetailsReducer';

import Home from './Home';
import styles from '../styles/global.css';

const store = createStore(serviceDetailsReducer, [ 'Use Redux' ], applyMiddleware(ReduxThunk));

class Provider extends React.Component{
	getChildContext(){
		return{
			store: this.props.store
		};
	}

	render(){
		return this.props.children;
	}
}

Provider.childContextTypes = {
	store: React.PropTypes.object
};
 
document.addEventListener('DOMContentLoaded', function() {
	ReactDOM.render(
		<Provider store={store}>
			<Home/>
		</Provider>,
		document.getElementById('mount')
	);
});
