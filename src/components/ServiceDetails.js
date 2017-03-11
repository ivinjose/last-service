import React from 'react';
import ServicedItem from './ServicedItem';

/**
 * A counter button: tap the button to increase the count.
 */
class ServiceDetails extends React.Component {
	constructor() {
		super();
	}
 
	render() {
		return (
			<div className="service-details">
				<select>
					<option value="volvo">Royal Enfield Electra</option>
					<option value="saab">Hyundai i20</option>
					<option value="mercedes">Hero Honda Splendor</option>
				</select> 
				<ServicedItem />
				<button onClick={this.saveServicedItem}>Save</button>
			</div>
		);
	}

	saveServicedItem(){

	}
}

export default ServiceDetails;