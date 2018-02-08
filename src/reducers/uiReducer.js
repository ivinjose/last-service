
const ui = function( state=[], action ){
    let newState;
    // console.log( 'ui reducer: action: ', action );
    // console.log( 'ui reducer: current state: ', state );
    switch( action.type ){
        case 'ADD_VEHICLE_REQUEST':
        case 'GET_VEHICLES_REQUEST':
        case 'GET_ALL_VEHICLES_REQUEST':
        case 'GET_ALL_SERVICES_REQUEST':
            newState = Object.assign( {}, state, { blockUi: true, showLoader: true } );
            // console.log( 'ui reducer: new state: ', newState );
            return newState;
            break;
        case 'ADD_VEHICLE_SUCCESS':
        case 'GET_ALL_VEHICLES_SUCCESS':
        case 'GET_ALL_SERVICES_SUCCESS':
            newState = Object.assign( {}, state, { blockUi: false, showLoader: false } );
            // console.log( 'ui reducer: new state: ', newState );
            return newState;
            break;
        case 'ADD_VEHICLE_FAILURE':
        case 'GET_ALL_VEHICLES_FAILURE':
        case 'GET_ALL_SERVICES_FAILURE':
            newState = Object.assign( {}, state, { blockUi: false, showLoader: false } );
            // console.log( 'ui reducer: new state: ', newState );
            return newState;
            break;
        default: 
            return state;
    }
}

export default ui;