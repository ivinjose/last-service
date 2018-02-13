import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import styles from './ViewServiceDetails.css';
import globalStyles from '../../styles/global.css';
import ServiceDetails from '../ServiceDetails';
import Header from '../common/Header';
import SubHeader from '../common/SubHeader';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';

import fetch from 'isomorphic-fetch';

class ViewServiceDetails extends React.Component {
	constructor() {
		super();
		this.state = {
			vehicles: [],
			currentVehicle: null,
			serviceDetails: null
		};
	}

	componentDidMount(){
		let queryParams = this.props.location.query;
		if( queryParams && queryParams.vehicle ){
			this.chooseVehicle(null,null, queryParams.vehicle);
		}
	}
 
	render() {
		return (
			<div className={styles['service-details']}>
				<SubHeader text={"VIEW SERVICES"} />
				<div className={styles['body']}>
					<div className={globalStyles['row']}>
						<SelectField hintText="Choose your vehicle" fullWidth={true} value={this.state.currentVehicle} onChange={this.chooseVehicle.bind(this)}>
							{
								this.props.vehicles.map(function(vehicle, index){
									return(
										<MenuItem key={vehicle._id} value={vehicle.name} primaryText={vehicle.name} />
									)
								})
							}
						</SelectField>
					</div>

					{this.state && this.state.serviceDetails &&
						<ServiceDetails data={this.state.serviceDetails} />
					}
				</div>
			</div>
		);
	}

	chooseVehicle(event, key, payload){
		this.setState({
			currentVehicle: payload
		});
		this.setState({
			serviceDetails: this.getServiceDetailsOf(payload)
		});
		
	}

	getServiceDetailsOf(vehicle){
		let services = this.props.services.filter( service => service.vehicle == vehicle )
		return services;
	}
}

ViewServiceDetails.contextTypes = {
	store: PropTypes.object
};

export default ViewServiceDetails;