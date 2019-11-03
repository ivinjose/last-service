import fetch from 'isomorphic-fetch';

const defaultHeaders = {
    'Content-Type': 'application/json'
};

const makeApiCall = (url, {method, headers}, onSuccess, onFailure) => {
    fetch(url, 
		{ 
			method, 
			headers: Object.assign({}, defaultHeaders, headers)
		}).then(function(response){
			return( response.text() );
		}).then(function(response){
			return JSON.parse(response);
		}).then(function(response){
            onSuccess(response.data);
		}).catch(function(error){
            onFailure(error);
		});
}

export default makeApiCall;