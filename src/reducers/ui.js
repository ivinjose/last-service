
const ui = function( state=[], action ){
    let newState;
    console.log( 'ui reducer: action: ', action );
    console.log( 'ui reducer: current state: ', state );
    switch( action.type ){
        case 'ADD_VEHICLE_REQUEST':
            newState = Object.assign( {}, state, { blockUi: true, showLoader: true } );
            console.log( 'ui reducer: new state: ', newState );
            return newState;
            break;
        case 'ADD_VEHICLE_SUCCESS':
            newState = Object.assign( {}, state, { blockUi: false, showLoader: false } );
            console.log( 'ui reducer: new state: ', newState );
            return newState;
            break;
        case 'ADD_VEHICLE_FAILURE':
            newState = Object.assign( {}, state, { blockUi: false, showLoader: false } );
            console.log( 'ui reducer: new state: ', newState );
            return newState;
            break;
        default: 
            return state;
    }
}

export default ui;