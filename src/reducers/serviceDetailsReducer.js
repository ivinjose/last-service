import {ADD_SERVICE_DETAILS, ADD_SERVICE_DETAILS_ASYNC} from '../actions/actionConstants';

const serviceDetailsReducer = (state = 0, action) => {
	let data;
	switch (action.type) {
		case ADD_SERVICE_DETAILS:
			data = state.data.slice();
			data.push( action.data );
			return { ...state, data: data };
		case ADD_SERVICE_DETAILS_ASYNC:
			data = state.data.slice();
			data.push( action.data );
			return { ...state, data: data };
		case 'REMOVE':
			return state - 1;
		default:
			return state;
	}
}

export default serviceDetailsReducer;