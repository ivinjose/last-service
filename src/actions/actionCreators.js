import {ADD_SERVICE_DETAILS, GET_SERVICE_DETAILS_SUCCESS} from './actionConstants';
import fetch from 'isomorphic-fetch';

export function addServiceDetails(data){
    return { 
        type: ADD_SERVICE_DETAILS,
        data: data
    };
}

export function addServiceDetailsAsync(data){
    return function(dispatch){
        fetch('http://localhost:4001/addservicedetails', 
            { 
                method: 'POST', 
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data) 
            }
            ).then(function(response){
                return response.text();              
            }).then(function(response){
                dispatch( addServiceDetails( data ) );
            });
    }
}

export function getServiceDetailsSuccess(data){
    return { 
        type: GET_SERVICE_DETAILS_SUCCESS,
        data: data
    };
}

export function getServiceDetailsOf(vehicle){
    return function(dispatch){
        fetch('http://localhost:4001/getservicedetails?vehicle='+vehicle, 
            { 
                method: 'GET'
            }
            ).then(function(response){
                return response.json();              
            }).then(function(response){
                dispatch( getServiceDetailsSuccess( response ) );
            });
    }
}