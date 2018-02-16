
const user = function( state=[], action ){
    switch( action.type ){
        case 'GET_USER_SUCCESS':
            return action.user;
            break; 
        case 'GET_USER_FAILURE':
            console.log('GET_USER_FAILURE');
            return state;
            break;
        default: 
            return state;
    }
}

export default user;