
const vehicles = function( state=[], action ){
    console.log( 'vehicles reducer: action: ', action );
    console.log( 'vehicles reducer: state: ', state );
    switch( action.type ){
        // Add vehicle flow
        case 'ADD_VEHICLE_SUCCESS':
            return [
                ...state,
                action.vehicleDetails
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
        default: 
            return state;
    }
}

export default vehicles;