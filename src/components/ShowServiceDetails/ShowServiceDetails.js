import React from 'react';
import ReactDOM from 'react-dom';
import classNames from 'classnames';
import ServicedItem from '../ServicedItem';
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
				{this.props.data.map(function(serviceDetail){
					return <span>{serviceDetail.vehicle}</span>
				})}			
			</div>
		);
	}
}

export default ServiceDetails;