import React from 'react';
import ReactDOM from 'react-dom';
 
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
				<input type="text" className="item-name" ref="item-name"/>
				<select className="item-service" ref="item-service">
					<option default>Select the type of service done</option>
					<option value="replaced">Replaced</option>
					<option value="fixed">Fixed</option>
					<option value="checkup">Checkup</option>
				</select>
				<input type="text" className="kms-reading" ref="kms-reading"/>
			</div>
		);
	}

	getValues(){
		let itemName = ReactDOM.findDOMNode( this.refs['item-name'] ).value;
		let itemService = ReactDOM.findDOMNode( this.refs['item-service'] ).value;
		let kmsReading = ReactDOM.findDOMNode( this.refs['kms-reading'] ).value;

		return { 
			itemName: itemName,
			itemService: itemService,
			kmsReading: kmsReading 
		};
	}
}

export default ServicedItem;