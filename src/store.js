import { createStore, compose, applyMiddleware } from 'redux';
import { syncHistoryWithStore } from 'react-router-redux';
import { browserHistory } from 'react-router';
import thunkMiddleware from 'redux-thunk'

// import root reducer
import rootReducer from './reducers/index';

// import default state
import defaultState from './defaultState';

const middleware = applyMiddleware( thunkMiddleware );

const store = createStore( 
    rootReducer,
    defaultState,
    compose( middleware,  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__() )
);

export default store;

