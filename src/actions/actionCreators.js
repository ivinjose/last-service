import {ADD_SERVICE_DETAILS, ADD_SERVICE_DETAILS_ASYNC} from './actionConstants';
import fetch from 'isomorphic-fetch';

export function addServiceDetails(data){
    return { 
        type: ADD_SERVICE_DETAILS,
        data: data
    };
}

export function addServiceDetailsAsync(data){
    return function(dispatch){
        fetch('http://localhost:4001/addservicedetails')
            .then(function(response){
                return response.text();              
            }).then(function(response){
                dispatch( addServiceDetails( response ) );
            });
    }
}