
const ui = function( state=[], action ){
    let newState;
    switch( action.type ){
        case 'ADD_VEHICLE_REQUEST':
        case 'ADD_SERVICE_REQUEST':
        case 'GET_VEHICLES_REQUEST':
        case 'GET_ALL_VEHICLES_REQUEST':
        case 'GET_ALL_SERVICES_REQUEST':
            newState = Object.assign( {}, state, { blockUi: true, showLoader: true } );
            return newState;
            break;
        case 'ADD_VEHICLE_SUCCESS':
        case 'ADD_SERVICE_SUCCESS':
        case 'GET_ALL_VEHICLES_SUCCESS':
        case 'GET_ALL_SERVICES_SUCCESS':
            newState = Object.assign( {}, state, { blockUi: false, showLoader: false } );
            return newState;
            break;
        case 'ADD_VEHICLE_FAILURE':
        case 'ADD_SERVICE_FAILURE':
        case 'GET_ALL_VEHICLES_FAILURE':
        case 'GET_ALL_SERVICES_FAILURE':
            newState = Object.assign( {}, state, { blockUi: false, showLoader: false } );
            return newState;
            break;
        default: 
            return state;
    }
}

export default ui;