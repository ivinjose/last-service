import React from 'react';
import ReactDOM from 'react-dom';
import styles from './ServicedItem.css'
 
/**
 * A counter button: tap the button to increase the count.
 */
class ServicedItem extends React.Component {
	constructor() {
		super();
	}
 
	render() {
		return (
			<div className={styles['serviced-item']}>
				<input type="text" className={styles['item-name']} ref="item-name"/>
				<select className={styles['item-service']} ref="item-service">
					<option default>Select the type of service done</option>
					<option value="replaced">Replaced</option>
					<option value="fixed">Fixed</option>
					<option value="checkup">Checkup</option>
				</select>
				<input type="text" className={styles['kms-reading']} ref="kms-reading"/>
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