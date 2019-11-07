import fetch from 'isomorphic-fetch';

const defaultHeaders = {
    'Content-Type': 'application/json'
};

const makeApiCall = async (url, {method, headers, body}) => {
	try{
		const apiResponse = await fetch(url,
			{ 
				method, 
				headers: Object.assign({}, defaultHeaders, headers),
				body: JSON.stringify(body)
			});
		const jsonResponse = await apiResponse.json();
		return jsonResponse.data;
	}catch(error){
		return error;
	}
}

export default makeApiCall;