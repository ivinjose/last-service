import fetch from 'isomorphic-fetch';

const defaultHeaders = {
    'Content-Type': 'application/json'
};

const makeApiCall = async (url, {method, headers, body}) => {
    return await fetch(url, 
		{ 
			method, 
			headers: Object.assign({}, defaultHeaders, headers),
			body: JSON.stringify(body)
		}).then(function(response){
			return( response.text() );
		}).then(function(response){
			return JSON.parse(response);
		}).then(function(response){
			return response.data;
		}).catch(function(error){
			return error;
		});
}

export default makeApiCall;