import React from 'react';
import ReactDOM from 'react-dom';
import StoreContext from 'storeon/react/context'
import { store } from '../state/store';
import App from './App';

document.addEventListener('DOMContentLoaded', function() {
	ReactDOM.render(
		<StoreContext.Provider value={store}>
			<App />
		</StoreContext.Provider>,
		document.getElementById('mount')
	);
});