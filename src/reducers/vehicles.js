
const vehicles = function( state=[], action ){
    console.log( 'vehicles reducer: action: ', action );
    console.log( 'vehicles reducer: currentstate: ', state );
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