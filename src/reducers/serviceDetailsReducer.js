
const serviceDetailsReducer = (state = 0, action) => {
	switch (action.type) {
		case 'ADD':
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