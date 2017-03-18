import React from 'react';
import ReactDOM from 'react-dom';
import classNames from 'classnames';
import styles from './ServicedItem.css'
import globalStyles from '../../styles/global.css';
 
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
				<select className={classNames(styles['item-service'],globalStyles['drop-down'])} ref="item-service">
					<option default>Select the type of service done</option>
					<option value="replaced">Replaced</option>
					<option value="fixed">Fixed</option>
					<option value="checkup">Checkup</option>
				</select>
				<input type="text" className={styles['date']} ref="date" placeholder="dd/mm/yyyy"/>
				<input type="text" className={styles['kms-reading']} ref="kms-reading" placeholder="kms reading (ex: 32000)"/>
				<input type="text" className={styles['amount']} ref="amount" placeholder="Amount paid"/>
				<button className={styles['button']} onClick={this.props.onSave}>Save</button>
			</div>
		);
	}

	getValues(){
		let itemName = ReactDOM.findDOMNode( this.refs['item-name'] ).value;
		let itemService = ReactDOM.findDOMNode( this.refs['item-service'] ).value;
		let kmsReading = ReactDOM.findDOMNode( this.refs['kms-reading'] ).value;
		let date = ReactDOM.findDOMNode( this.refs['date'] ).value;
		let amount = ReactDOM.findDOMNode( this.refs['amount'] ).value;

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