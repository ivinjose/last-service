
const vehicles = function( state=[], action ){
    console.log( 'vehicles reducer: action: ', action );
    console.log( 'vehicles reducer: state: ', state );
    switch( action.type ){
        // Add vehicle flow
        case 'ADD_VEHICLE_SUCCESS':
            return [
                ...state,
                ...action.vehiclesAdded
            ]
            break;
        case 'ADD_VEHICLE_FAILURE':
            console.log('ADD_VEHICLE_FAILURE');
            break;
            
        // Get vehicle flow
        case 'GET_VEHICLES_SUCCESS':
            return [
                ...state,
                action.vehiclesList
            ]
            break; 
        case 'GET_VEHICLES_FAILURE':
            console.log('ADD_VEHICLE_FAILURE');
            break;

        // Get all vehicles flow
        case 'GET_ALL_VEHICLES_SUCCESS':
            /* 
             * Here we dont to maintain the vehicles already in the state. 
             * Since it's a get all vehicles call, we wipe existing state and refill with new and complete list.
             */
            return [
                ...action.vehicles
            ]
            break; 
    case 'GET_ALL_VEHICLES_FAILURE':
            console.log('ADD_VEHICLE_FAILURE');
            break;
    default: 
        return state;
    }
}

export default vehicles;