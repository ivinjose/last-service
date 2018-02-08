import fetch from 'isomorphic-fetch';

export function getAllServices( ){
    return {
        type: 'GET_ALL_SERVICES_REQUEST',
        data: null
    };
}

export function getAllServicesAsync( ){
    return function (dispatch){
        dispatch( getAllServices() );
        fetch('http://localhost:4001/getAllServices',
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
                dispatch( getAllServicesSuccess( response ) );
            }).catch(function(error){
                dispatch( getAllServicesFailure( error ) );
            });
    }
}

export function getAllServicesSuccess( response ){
    return {
        type: 'GET_ALL_SERVICES_SUCCESS',
        services: response.data
    };
}

export function getAllServicesFailure( details ){
    return {
        type: 'GET_ALL_SERVICES_FAILURE',
        data: { ...details }
    };
}