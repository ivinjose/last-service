import { browserHistory } from 'react-router';
import routes from '../../routes/routes';

export default{
    addNew(){
		browserHistory.push( routes[1].path );
	},

	getVehiclesList(){
		return fetch('http://localhost:4001/getvehicles', 
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