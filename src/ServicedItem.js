import React from 'react';
 
/**
 * A counter button: tap the button to increase the count.
 */
class ServicedItem extends React.Component {
	constructor() {
		super();
	}
 
	render() {
		return (
			<div className="serviced-item">
				<input type="text" className="item-name" />
				<select className="item-service">
					<option default>Select the type of service done</option>
					<option value="replaced">Replaced</option>
					<option value="fixed">Fixed</option>
					<option value="checkup">Checkup</option>
				</select>
				<input type="text" className="kms-reading" />
			</div>
		);
	}
}

export default ServicedItem;