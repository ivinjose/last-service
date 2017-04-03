import {ADD_SERVICE_DETAILS, ADD_SERVICE_DETAILS_ASYNC} from './actionConstants';
import fetch from 'isomorphic-fetch';

export function addServiceDetails(data){
    console.log('addServiceDetails data-- ',data);
    return { 
        type: ADD_SERVICE_DETAILS,
        data: data
    };
}

export function addServiceDetailsAsync(data){

    return new Promise(function(resolve, reject){
        fetch('http://localhost:4001/addservicedetails')
            .then(function(response){
                resolve(addServiceDetails(response.text()))
            })
            .then(function(error){
                reject('error');
            });
    });

}