import React from 'react';
import ReactDOM from 'react-dom';
import StoreContext from 'storeon/react/context'
import { store } from '../state/store';
import App from './App';

const _render = () => ReactDOM.render(
  <StoreContext.Provider value={store}>
    <App />
  </StoreContext.Provider>,
  document.getElementById('mount')
);

document.addEventListener('DOMContentLoaded', function() {
	_render();
	if(module.hot) {
		module.hot.accept(['./App'], _render);
	}
});
