import React from 'react';
import ReactDOM from 'react-dom';
import classNames from 'classnames';
import ServicedItem from './AddServicedItem';
import styles from './AddServiceDetails.css';
import globalStyles from '../../styles/global.css';
import {addServiceDetails} from '../../actions/actionCreators';

class AddServiceDetails extends React.Component {
	constructor() {
		super();
	}

	render() {
		return (
			<div className={styles['service-details']}>
				<div className={globalStyles['row']}>
					<div className={globalStyles['label']}>Choose your vehicle:</div>
					<div className={globalStyles['value']}>
						<select ref="vehicle" className={classNames(styles['vehicle-name'],globalStyles['drop-down'])}>
							<option value="Royal Enfield Electra">Royal Enfield Electra</option>
							<option value="Hyundai i20">Hyundai i20</option>
							<option value="Hero Honda Splendor">Hero Honda Splendor</option>
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
		let { store } = this.context;
		let vehicle = { vehicle: ReactDOM.findDOMNode( this.refs.vehicle ).value };
		let servicedItem = this.refs['serviced-item'].getValues() ;

		let data = Object.assign( {}, vehicle, servicedItem );
		store.dispatch(addServiceDetails(data));
	}
}

AddServiceDetails.contextTypes = {
	store: React.PropTypes.object
};

export default AddServiceDetails;