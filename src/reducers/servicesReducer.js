
const services = function( state=[], action ){
    switch( action.type ){
        // Get all services flow
        case 'GET_ALL_SERVICES_SUCCESS':
            /* 
             * Here we dont to maintain the services already in the state. 
             * Since it's a get all services call, we wipe existing state and refill with new and complete list.
             */
            return [
                ...action.services
            ]
            break; 
        case 'GET_ALL_SERVICES_FAILURE':
                console.log('GET_ALL_SERVICES_FAILURE');
                return state;
                break;
        default: 
            return state;
        }
}

export default services;