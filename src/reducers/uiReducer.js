
const ui = function( state=[], action ){
    let newState;
    switch( action.type ){
        case 'ADD_VEHICLES_INIT':
        case 'ADD_SERVICES_INIT':
        case 'UPDATE_VEHICLE_INIT':
        case 'GET_VEHICLES_REQUEST':
        case 'GET_ALL_VEHICLES_REQUEST':
        case 'GET_ALL_SERVICES_REQUEST':
            newState = Object.assign( {}, state, { blockUi: true, showLoader: true } );
            return newState;
            break;
        case 'ADD_VEHICLES_SUCCESS':
        case 'ADD_SERVICES_SUCCESS':
        case 'UPDATE_VEHICLE_SUCCESS':
        case 'GET_ALL_VEHICLES_SUCCESS':
        case 'GET_ALL_SERVICES_SUCCESS':
            newState = Object.assign( {}, state, { blockUi: false, showLoader: false } );
            return newState;
            break;
        case 'ADD_VEHICLES_FAILURE':
        case 'ADD_SERVICES_FAILURE':
        case 'UPDATE_VEHICLE_FAILURE':
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