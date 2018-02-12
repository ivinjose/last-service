
const services = function( state=[], action ){
    switch( action.type ){
        // Add service flow
        case 'ADD_SERVICE_SUCCESS':
            return [
                ...state,
                ...action.servicesAdded
            ]
            break;
        case 'ADD_SERVICE_FAILURE':
            console.log('ADD_SERVICE_FAILURE');
            break;
            
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