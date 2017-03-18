import React from 'react';
import ReactDOM from 'react-dom';
import classNames from 'classnames';
import ServicedItem from '../ServicedItem';
import styles from './AddServiceDetails.css';
import globalStyles from '../../styles/global.css';

class ServiceDetails extends React.Component {
	constructor() {
		super();
	}
 
	render() {
		return (
			<div className={styles['service-details']}>
				<div  className={globalStyles['row']}>
					<div className={globalStyles['label']}>Choose your vehicle:</div>
					<div className={globalStyles['value']}>
						<select ref="vehicle" className={classNames(styles['vehicle-name'],globalStyles['drop-down'])}>
							<option value="electra">Royal Enfield Electra</option>
							<option value="i20">Hyundai i20</option>
							<option value="splendor">Hero Honda Splendor</option>
						</select> 
					</div>
				</div>
				<div  className={globalStyles['row']}>
					<div className={globalStyles['label']}>Enter service details:</div>
					<div className={globalStyles['value']}>
						<ServicedItem ref="serviced-item" onSave={this.saveServicedItem.bind(this)}/>
					</div>
				</div>
				
			</div>
		);
	}

	saveServicedItem(e){
		let vehicle = { vehicle: ReactDOM.findDOMNode( this.refs.vehicle ).value };
		let servicedItem = this.refs['serviced-item'].getValues() ;

		let data = Object.assign( {}, vehicle, servicedItem );
		this.props.store.dispatch({ type: 'ADD', data: data });
	}
}

export default ServiceDetails;