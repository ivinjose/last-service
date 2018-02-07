import fetch from 'isomorphic-fetch';

export function increment( index ){
    return {
        type: 'INCREMENT_LIKES',
        index
    };
}

export function addVehicle( details ){
    return {
        type: 'ADD_VEHICLE_REQUEST',
        data: { ...details }
    };
}

export function addVehicleAsync( vehicleDetails ){
    let vehicleObj = { name: vehicleDetails.vehicle, type: vehicleDetails.vehicleType };
    let data = Object.assign( {}, vehicleObj );

    return function (dispatch){
        dispatch( addVehicle() );
        fetch('http://localhost:4001/addvehicledetails', 
            { 
                method: 'POST', 
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data) 
                       
            }).then(function(response){
                return( response.text() );
            }).then(function(response){
                return JSON.parse(response);
            }).then(function(response){
                console.log( 'Received success response from API side.' );
                dispatch( addVehicleSuccess( vehicleDetails, response ) );
            }).catch(function(error){
                console.log( 'Received error response from API side.' );
                dispatch( addVehicleFailure( response ) );
            });
    }
}

export function addVehicleSuccess( vehicleDetails, response ){
    return {
        type: 'ADD_VEHICLE_SUCCESS',
        vehicleDetails, 
        response
    };
}

export function addVehicleFailure( details ){
    return {
        type: 'ADD_VEHICLE_FAILURE',
        data: { ...details }
    };
}

function saveVehicle(vehicle, vehicleType, isEditMode){
    let vehicleObj = { name: vehicle, type: vehicleType };

    let url = 'http://localhost:4001/addvehicledetails';
    if(isEditMode){
        url = 'http://localhost:4001/updatevehicledetails';
        vehicleObj._id = this.state.vehicleId;
    }

    let data = Object.assign( {}, vehicleObj );
    let _this = this;

    return fetch(url, 
    { 
        method: 'POST', 
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data) 
               
    }).then(function(response){
        return( response.text() );
    }).then(function(response){
        return JSON.parse(response);
    }).then(function(response){
        return response;
    }).catch(function(error){
        return error;
    });
}
