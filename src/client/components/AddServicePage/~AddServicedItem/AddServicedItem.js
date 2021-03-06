import React from 'react';
import ReactDOM from 'react-dom';
import classNames from 'classnames';
import styles from './AddServicedItem.css'
import globalStyles from '../../../styles/global.css';
 
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
				<input type="text" className={styles['item-name']} ref="item-name" placeholder="Example: Air filter or Engine oil"/>
				<select className={classNames(styles['item-service'],globalStyles['drop-down'])} value="test" ref="item-service">
					<option default>Select the type of service done</option>
					<option value="Replaced">Replaced</option>
					<option value="Fixed">Fixed</option>
					<option value="Checkup">Checkup</option>
				</select>
				<input type="date" className={styles['date']} ref="date" placeholder="dd/mm/yyyy"/>
				<input type="text" className={styles['kms-reading']} ref="kms-reading" placeholder="kms reading (ex: 32000)"/>
				<input type="text" className={styles['amount']} ref="amount" placeholder="Amount paid"/>
				<button className={styles['button']} onClick={this.props.onSave}>Save</button>
			</div>
		);
	}

	getValues(){
		// let itemName = ReactDOM.findDOMNode( this.refs['item-name'] ).value;
		// let itemService = ReactDOM.findDOMNode( this.refs['item-service'] ).value;
		// let kmsReading = ReactDOM.findDOMNode( this.refs['kms-reading'] ).value;
		// let date = ReactDOM.findDOMNode( this.refs['date'] ).value;
		// let amount = ReactDOM.findDOMNode( this.refs['amount'] ).value;

		let itemName = "Air filter";
		let itemService = "Changed";
		let kmsReading = "32500";
		let date = "28/02/1989";
		let amount = "450";

		return { 
			itemName: itemName,
			itemService: itemService,
			kmsReading: kmsReading,
			date: date,
			amount: amount
		};
	}
}

export default ServicedItem;