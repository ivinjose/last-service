import React from 'react';
import ReactDOM from 'react-dom';
import classNames from 'classnames';
import styles from './ShowServiceDetails.css';
import globalStyles from '../../styles/global.css';

class ServiceDetails extends React.Component {
	constructor() {
		super();
	}
 
	render() {
		console.log(this.props.data);
		return (
			<div className={styles['service-details']}>
				{this.props.data.map(function(serviceDetail, index){
					return (
						<div className={globalStyles['row']} key={index}>
							<div>{serviceDetail.vehicle}</div>
							<div>{serviceDetail.itemName}</div>
							<div>{serviceDetail.itemService}</div>
							<div>{serviceDetail.date}</div>
							<div>{serviceDetail.kmsReading}</div>
							<div>{serviceDetail.amount}</div>
						</div>
					)
				})}			
			</div>
		);
	}
}

export default ServiceDetails;