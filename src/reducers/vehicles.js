
const vehicles = function( state=[], action ){
    switch( action.type ){
        case 'ADD_VEHICLE_SUCCESS':
            return [
                ...state,
                action.vehicleDetails
            ]
            break; 
        case 'ADD_VEHICLE_FAILURE':
            console.log('ADD_VEHICLE_FAILURE');
            //do stuff
            break;
        default: 
            return state;
    }
}

export default vehicles;