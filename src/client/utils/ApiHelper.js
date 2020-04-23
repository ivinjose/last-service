import fetch from 'isomorphic-fetch';
import ApiConstants from "../constants/ApiConstants";
import Strings from "../constants/StringConstants";

const defaultHeaders = {
    'Content-Type': 'application/json'
};

const makeApiCall = async (url, {method, headers, body}) => {
	try{
		const apiResponse = await fetch(url,
			{ 
				method, 
				headers: Object.assign({}, defaultHeaders, headers),
				body: JSON.stringify(body),
				credentials: "include"
			});
		const jsonResponse = await apiResponse.json();
		return jsonResponse;
	}catch(error){
		console.log(error)
		return { status: ApiConstants.STATUS_ERROR, message: Strings.SNACKBAR_MESSAGES.SOMETHING_WENT_WRONG };
	}
}

export default makeApiCall;