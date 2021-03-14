import React from 'react';
import classNames from 'classnames';
import styles from './Service.css';
import { formatCurrency } from '../../../utils/Helpers';
import OptionsMenu from "./OptionsMenu";

const options = [
	{
		label: 'Modify',
		action: (e) => {
			e.stopPropagation();
			alert('modify')
		}
	},
	{
		label: 'Edit',
		action: (e) => {
			e.stopPropagation();
			alert('edit')
		}
	}
];

const Service = ({service, style}) => {
	return(
		<div className={styles['service']} style={style}  key={service._id} >
			<div className={styles['wrapper']}>

				<div className={classNames(styles['value'], styles['options'])}>
					<OptionsMenu options={options}/>
				</div>
				<div className={classNames(styles['label'], styles['date'])}>{service.date}</div>
				
				{ service.vehicle &&
					<React.Fragment>
						<div className={styles['label']}>Vehicle</div>
						<div className={styles['value']}>{service.vehicle}</div>
					</React.Fragment>
				}

				<div className={styles['label']}>Amount</div>
				<div className={styles['value']}>{formatCurrency(service.amount)}</div>

				<div className={styles['label']}>Component</div>
				<div className={styles['value']}>{service.component}</div>

				{ service.kmsReading &&
					<React.Fragment>
						<div className={styles['label']}>Distance</div>
						<div className={styles['value']}>{service.kmsReading} kms</div>
					</React.Fragment>
				}
				
				{ service.comment && <div className={classNames(styles['label'], styles['comment'])}>- {service.comment}</div> }
			</div>
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