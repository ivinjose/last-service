import fetch from 'isomorphic-fetch';

export default {
    /**
	 * Gets the details of the given vehicle
	 * @param {string} vehicle - The name of the vehicle
     * @returns {prommise}
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
    },

    saveVehicle(vehicle, vehicleType, isEditMode){
		let vehicleObj = { name: vehicle, type: vehicleType };

		let url = 'http://localhost:4001/addvehicledetails';
		if(isEditMode){
			url = 'http://localhost:4001/updatevehicledetails';
			vehicleObj._id = this.state.vehicleId;
		}

		let data = Object.assign( {}, vehicleObj );
		let _this = this;

		return fetch(url, 
		{ 
			method: 'POST', 
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(data) 
				   
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