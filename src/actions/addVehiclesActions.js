import fetch from 'isomorphic-fetch';

export function addVehiclesInit( details ){
    return {
        type: 'ADD_VEHICLES_INIT',
        data: { ...details }
    };
}

export function addVehicles( vehicles ){
    return (dispatch) => {
        dispatch( addVehiclesInit() );
        fetch('http://localhost:4001/vehicles', 
            { 
                method: 'POST', 
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify( vehicles ) 
                       
            }).then(function(response){
                return( response.text() );
            }).then(function(response){
                return JSON.parse(response);
            }).then(function(response){
                dispatch( addVehiclesSuccess( response.data ) );
            }).catch(function(error){
                dispatch( addVehiclesFailure( response ) );
            });
    }
}

export function addVehiclesSuccess( vehiclesAdded ){
    return {
        type: 'ADD_VEHICLES_SUCCESS',
        vehiclesAdded
    };
}

export function addVehiclesFailure( details ){
    return {
        type: 'ADD_VEHICLES_FAILURE',
        data: { ...details }
    };
}