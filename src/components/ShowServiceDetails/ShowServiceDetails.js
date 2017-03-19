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
			<table className={styles['service-details']}>
				{this.props.data.map(function(serviceDetail, index){
					return (
						<tr className={classNames(globalStyles['row'],styles['row'])} key={index}>
							<td className={styles['cell']}>{serviceDetail.vehicle}</td>
							<td className={styles['cell']}>{serviceDetail.itemName}</td>
							<td className={styles['cell']}>{serviceDetail.itemService}</td>
							<td className={styles['cell']}>{serviceDetail.date}</td>
							<td className={styles['cell']}>{serviceDetail.kmsReading} kms</td>
							<td className={styles['cell']}>{serviceDetail.amount} INR</td>
						</tr>
					)
				})}			
			</table>
		);
	}
}

export default ServiceDetails;