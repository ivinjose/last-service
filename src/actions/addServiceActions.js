import fetch from 'isomorphic-fetch';

export function addService( details ){
    return {
        type: 'ADD_SERVICE_REQUEST',
        data: { ...details }
    };
}

export function addServiceAsync( serviceDetails ){
    return (dispatch) => {
        dispatch( addService() );
        fetch('http://localhost:4001/addservicedetails', 
            { 
                method: 'POST', 
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(serviceDetails) 
                       
            }).then(function(response){
                return( response.text() );
            }).then(function(response){
                return JSON.parse(response);
            }).then(function(response){
                dispatch( addServiceSuccess( response.data ) );
            }).catch(function(error){
                dispatch( addServiceFailure( error ) );
            });
    }
}

export function addServiceSuccess( servicesAdded ){
    return {
        type: 'ADD_SERVICE_SUCCESS',
        servicesAdded
    };
}

export function addServiceFailure( details ){
    return {
        type: 'ADD_SERVICE_FAILURE',
        data: { ...details }
    };
}