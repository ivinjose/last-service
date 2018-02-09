import fetch from 'isomorphic-fetch';

export function addVehicle( details ){
    return {
        type: 'ADD_VEHICLE_REQUEST',
        data: { ...details }
    };
}

export function addVehicleAsync( vehicleDetails ){
    return (dispatch) => {
        dispatch( addVehicle() );
        fetch('http://localhost:4001/addvehicledetails', 
            { 
                method: 'POST', 
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(vehicleDetails) 
                       
            }).then(function(response){
                return( response.text() );
            }).then(function(response){
                return JSON.parse(response);
            }).then(function(response){
                dispatch( addVehicleSuccess( response.data ) );
            }).catch(function(error){
                dispatch( addVehicleFailure( response ) );
            });
    }
}

export function addVehicleSuccess( vehiclesAdded ){
    return {
        type: 'ADD_VEHICLE_SUCCESS',
        vehiclesAdded
    };
}

export function addVehicleFailure( details ){
    return {
        type: 'ADD_VEHICLE_FAILURE',
        data: { ...details }
    };
}

export function increment( index ){
    return {
        type: 'INCREMENT_LIKES',
        index
    };
}