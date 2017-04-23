import {ADD_SERVICE_DETAILS_SUCCESS, GET_SERVICE_DETAILS_SUCCESS} from '../actions/actionConstants';

const serviceDetailsReducer = (state = 0, action) => {
	let data;
	switch (action.type) {
		case ADD_SERVICE_DETAILS_SUCCESS:
			data = state.appData.serviceDetails.slice();
			data.push( action.data );
			return { 
				...state, 
				appData: {
					serviceDetails: data
				} 
			};
		case GET_SERVICE_DETAILS_SUCCESS:
			data = action.data.slice();
			return { 
				...state, 
				appData: {
					serviceDetails: data
				} 
			};
		case 'REMOVE':
			return state - 1;
		default:
			return state;
	}
}

export default serviceDetailsReducer;