import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import styles from './ViewServiceDetails.css';
import globalStyles from '../../styles/global.css';
import {getServiceDetailsOf} from '../../actions/actionCreators';
import ServiceDetails from '../ServiceDetails';
import Header from '../common/Header';

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
		this.getVehiclesList();
		let queryParams = this.props.location.query;
		if( queryParams && queryParams.vehicle ){
			this.chooseVehicle(null,null, queryParams.vehicle);
		}
	}
 
	render() {
		return (
			<div className={styles['service-details']}>
				<Header title={'View service details'}/>
				<div className={styles['body']}>
					<div className={globalStyles['row']}>
						<SelectField hintText="Choose your vehicle" fullWidth={true} value={this.state.currentVehicle} onChange={this.chooseVehicle.bind(this)}>
							{
								this.state.vehicles.map(function(vehicle, index){
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

	getVehiclesList(){
		var _this = this;
		fetch('http://localhost:4001/getvehicles', 
		{ 
			method: 'GET', 
			headers: {
				'Content-Type': 'application/json'
			}
				   
		}).then(function(response){
			return( response.text() );
		}).then(function(response){
			return JSON.parse(response);
		}).then(function(response){
			_this.setState({
				vehicles: response.data
			});
		}).catch(function(error){
			console.log('some error');
		});
	}

	chooseVehicle(event, key, payload){
		this.setState({
			currentVehicle: payload
		});
		this.getServiceDetailsOf(payload);
	}

	getServiceDetailsOf(vehicle){
		var _this = this;
		fetch('http://localhost:4001/getservicedetails?vehicle=' + vehicle, 
		{ 
			method: 'GET', 
			headers: {
				'Content-Type': 'application/json'
			}
				   
		}).then(function(response){
			return( response.text() );
		}).then(function(response){
			return JSON.parse(response);
		}).then(function(response){
			_this.setState({
				serviceDetails: response
			});
		}).catch(function(error){
			console.log('some error');
		});


		let { store } = this.context;
		store.dispatch(getServiceDetailsOf(vehicle));
	}
}

ViewServiceDetails.contextTypes = {
	store: PropTypes.object
};

export default ViewServiceDetails;