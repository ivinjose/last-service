import fetch from 'isomorphic-fetch';

export function getVehicles( details ){
    return {
        type: 'GET_VEHICLES_REQUEST',
        data: { ...details }
    };
}

export function getVehiclesAsync( vehicleNames ){
    return function (dispatch){
        dispatch( getVehicles() );
        fetch('http://localhost:4001/getvehicledetails?vehicle=' + vehicleNames, 
            { 
                method: 'GET', 
                headers: {
				    'Content-Type': 'application/json'
			    }         
            }).then(function(response){
                return( response.text() );
            }).then(function(response){
                return JSON.parse(response);
            }).then(function(response){
                dispatch( getVehiclesSuccess( response ) );
            }).catch(function(error){
                dispatch( getVehiclesFailure( response ) );
            });
    }
}

export function getVehiclesSuccess( vehiclesList ){
    // debugger;
    return {
        type: 'GET_VEHICLES_SUCCESS',
        vehiclesList
    };
}

export function getVehiclesFailure( details ){
    return {
        type: 'GET_VEHICLES_FAILURE',
        data: { ...details }
    };
}
