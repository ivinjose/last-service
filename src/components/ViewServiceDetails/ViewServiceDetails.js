import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import styles from './ViewServiceDetails.css';
import globalStyles from '../../styles/global.css';
import ServiceDetails from '../ServiceDetails';
import Header from '../common/Header';

import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';

import fetch from 'isomorphic-fetch';

class ViewServiceDetails extends React.Component {
	constructor() {
		super();
		this.state = {
			vehicles: [],
			currentVehicle: "",
			serviceDetails: [],
		};
	}

	componentDidMount() {
		this.getVehiclesList();
		let queryParams = this.props.location.query;
		if (queryParams && queryParams.vehicle) {
			this.chooseVehicle(queryParams.vehicle);
		}
	}

	render() {
		let placeHolderItem = <MenuItem disabled value="" key='chooseVehicle'><em>Choose Vehicle</em></MenuItem>;
		const menuItems = [placeHolderItem, ...this.state.vehicles.map((vehicle) => (
			<MenuItem value={vehicle._id} key={vehicle._id} >
				{vehicle.name}
			</MenuItem>
		))];

		return (
			<div className={styles['service-details']}>
				<Header title={'View service details'} />
				<div className={styles['body']}>
					<div className={globalStyles['row']}>
						<Select
							displayEmpty
							value={this.state.currentVehicle}
							onChange={(e) => this.chooseVehicle(e.target.value)}
							className={styles['select-cmp']}
						>
							{menuItems}
						</Select>
					</div>
					{this.state.serviceDetails.length > 0 &&
						<ServiceDetails data={this.state.serviceDetails} />
					}
				</div>
			</div>
		);
	}

	getVehiclesList() {
		var _this = this;
		fetch('http://localhost:4001/users/5a86de0b90d792bccf3c3404/vehicles',
			{
				method: 'GET',
				headers: {
					'Content-Type': 'application/json'
				}
			}).then(function (response) {
				return (response.text());
			}).then(function (response) {
				return JSON.parse(response);
			}).then(function (response) {
				_this.setState({
					vehicles: response.data || []
				});
			}).catch(function (error) {
				console.log('Error in ViewServiceDetails - getVehiclesList ', error);
			});
	}

	chooseVehicle(id) {
		this.setState({
			currentVehicle: id
		});
		this.getServiceDetailsOf(id);
	}

	getServiceDetailsOf(vehicle) {
		var _this = this;
		fetch('http://localhost:4001/vehicles/' + vehicle + '/services',
			{
				method: 'GET',
				headers: {
					'Content-Type': 'application/json'
				}
			}).then(function (response) {
				return (response.text());
			}).then(function (response) {
				return JSON.parse(response);
			}).then(function (response) {
				_this.setState({
					serviceDetails: response.data || []
				});
			}).catch(function (error) {
				console.log('Error in ViewServiceDetails - getServiceDetailsOf ', error);
			});
	}
}

ViewServiceDetails.contextTypes = {
	store: PropTypes.object
};

export default ViewServiceDetails;