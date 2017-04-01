import {ADD_SERVICE_DETAILS} from './actionConstants';

export function addServiceDetails(data){
    return { 
        type: ADD_SERVICE_DETAILS,
        data: data
    };
}