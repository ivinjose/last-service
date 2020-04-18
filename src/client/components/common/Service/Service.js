import React from 'react';
import styles from './Service.css';
import { formatCurrency } from '../../../utils/Helpers';

const Service = ({service, style}) => {
	return(
		<div className={styles['service']} style={style}  key={service._id} >
			<div className={styles['date']}>{service.date}</div>
			<table>
				<tbody>
					{
						service.vehicle &&
						<tr>
							<td className={styles['col']}>Vehicle</td>
							<td className={styles['col-details']}><span>{service.vehicle}</span></td>
						</tr>
					}
					
					<tr>
						<td className={styles['col']}>Amount</td>
						<td className={styles['col-details']}><span>{formatCurrency(service.amount)}</span></td>
					</tr>
					<tr>
						<td className={styles['col']}>Component</td>
						<td className={styles['col-details']}><span>{service.component}</span></td>
					</tr>
					{
						service.kmsReading &&
						<tr>
							<td className={styles['col']}>Distance</td>
							<td className={styles['col-details']}><span>{service.kmsReading} kms</span></td>
						</tr>
					}
				</tbody>
			</table>
			{ service.comment && <div className={styles['comment']}>{service.comment}</div> }
		</div>
	);
};

const ServiceEmpty = () => {
	return(
		<div className={styles['service-empty']} >
			<div className={styles['date']}></div>
			<div className={styles['amount']}></div>
			<div className={styles['component']}></div>
			<div className={styles['distance']}></div>
			<div className={styles['comments']}></div>
		</div>
	);
}

export default Service;
export { ServiceEmpty };