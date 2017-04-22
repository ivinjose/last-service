import {ADD_SERVICE_DETAILS, GET_SERVICE_DETAILS_SUCCESS} from '../actions/actionConstants';

const serviceDetailsReducer = (state = 0, action) => {
	let data;
	switch (action.type) {
		case ADD_SERVICE_DETAILS:
			data = state.data.slice();
			data.push( action.data );
			return { ...state, data: data };
		case GET_SERVICE_DETAILS_SUCCESS:
			data = action.data.slice();
			data.push( action.data );
			return { ...state, data: data };
		case 'REMOVE':
			return state - 1;
		default:
			return state;
	}
}

export default serviceDetailsReducer;