import React from 'react';
import styles from './Service.css';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import Collapse from '@material-ui/core/Collapse';

const Service = (service) => {
	const dateTime = formatDateTime(service.date);

	return(
		<Card className={styles['service']} key={service._id} style={{marginBottom: '5px'}} >
			<CardHeader title={dateTime.date} subtitle={dateTime.time} />
			<Collapse in={true}>
				<CardContent>
					<table>
						<tbody>
							<tr>
								<td className={styles['Col']}>Amount</td>
								<td className={styles['Col-Details']}><span>{service.amount}</span></td>
							</tr>
							<tr>
								<td className={styles['Col']}>Component</td>
								<td className={styles['Col-Details']}><span>{service.component}</span></td>
							</tr>
							<tr>
								<td className={styles['Col']}>Distance</td>
								<td className={styles['Col-Details']}><span>{service.kmsReading} kms</span></td>
							</tr>
						</tbody>
					</table>
					<div className={styles['CommentsSection']}>
						<div className={styles['Header']}><span>Comments</span></div>
						<div className={styles['Comments']}>" <span>{service.comments}</span> "</div>
					</div>
				</CardContent>
			</Collapse>
		</Card>
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