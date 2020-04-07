import React from 'react';
import styles from './Service.css';

const Service = (service) => {
	const dateTime = formatDateTime(service.date);

	return(
		<div className={styles['service']} key={service._id} >
			<div className={styles['date']}>{dateTime.date}</div>
			<table>
				<tbody>
					<tr>
						<td className={styles['col']}>Amount</td>
						<td className={styles['col-details']}><span>{service.amount}</span></td>
					</tr>
					<tr>
						<td className={styles['col']}>Component</td>
						<td className={styles['col-details']}><span>{service.component}</span></td>
					</tr>
					<tr>
						<td className={styles['col']}>Distance</td>
						<td className={styles['col-details']}><span>{service.kmsReading} kms</span></td>
					</tr>
				</tbody>
			</table>
			<div className={styles['comments']}>"{service.comments}"</div>
		</div>
	);
};

const formatDateTime = (date) => {
	const newDate = new Date(date);
	return {
		date: newDate.toLocaleDateString(),
		time: newDate.toLocaleTimeString()
	};
};

export default Service;