import {ADD_SERVICE_DETAILS, ADD_SERVICE_DETAILS_ASYNC} from '../actions/actionConstants';

const serviceDetailsReducer = (state = 0, action) => {
	switch (action.type) {
		case ADD_SERVICE_DETAILS:
			let data = state.data.slice();
			data.push( action.data );
			return { ...state, data: data };
		case ADD_SERVICE_DETAILS_ASYNC:
			if( !state.data ){
				state.data = [];
			}
			state.data.push( action.data );
			return state;
		case 'REMOVE':
			return state - 1;
		default:
			return state;
	}
}

export default serviceDetailsReducer;