import counter from '../reducers/reducer';

const createStore = () => {
	let state;
	let listeners = [];

	const getState = () => state;

	const dispatch = (action) =>{
		state = counter( state, action );
		listeners.forEach( listener => listener() );
	};

	const subscribe = (listener) => {
		listeners.push(listener);
	};

	dispatch({});

	return {getState, dispatch, subscribe};
}

export default createStore;