
const createStore = (reducer) => {
	let state = {};
	let listeners = [];

	const getState = () => state;

	const dispatch = (action) =>{
		if( !state.data ){
			state.data = [];
		}
		state.data.push( reducer( state, action ) );
		listeners.forEach( listener => listener() );
	};

	const subscribe = (listener) => {
		listeners.push(listener);
	};

	// dispatch({});

	return {getState, dispatch, subscribe};
}

export default createStore;