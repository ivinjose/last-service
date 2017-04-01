import {ADD_SERVICE_DETAILS, ADD_SERVICE_DETAILS_ASYNC} from './actionConstants';
import fetch from 'isomorphic-fetch';

export function addServiceDetails(data){
    return { 
        type: ADD_SERVICE_DETAILS,
        data: data
    };
}

export function addServiceDetailsAsync(data){
    // let apiData = fetch('http://localhost:4001/addservicedetails').then(function(response){
    //     return response;
    // });
    // console.log('apiData',apiData);
    // return { 
    //     type: PUSH_SERVICE_DETAILS,
    //     data: data
    // };
    
    /*
    * New attempt to learn dispatch thunking
    */
    return function(dispatch){
         setTimeout(function(){
            dispatch({
                type: ADD_SERVICE_DETAILS,
                data
            })
        },2000);
    }
}