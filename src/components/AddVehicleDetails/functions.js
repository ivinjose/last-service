import fetch from 'isomorphic-fetch';

export default {
    /**
	 * This function is used when it's and edit flow
	 * @param {string} vehicle 
     * returns a promise
	 */
	getVehicleDetails(vehicle){
		return fetch('http://localhost:4001/getvehicledetails?vehicle=' + vehicle, 
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
			return response;
		}).catch(function(error){
			return error;
		});
    }
    
}