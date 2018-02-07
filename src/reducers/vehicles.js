
const vehicles = function( state=[], action ){
    switch( action.type ){
        case 'ADD_VEHICLE_REQUEST':
            console.log('ADD_VEHICLE_REQUEST');
            //do stuff
            return state;
            break;
        case 'ADD_VEHICLE_SUCCESS':
            console.log('ADD_VEHICLE_SUCCESS');
            //do stuff
            const newState = Object.assign( {}, state, { newValue: 1 } );
            debugger;
            return newState;
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