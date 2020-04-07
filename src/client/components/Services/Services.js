import React from 'react';
import PropTypes from 'prop-types';
import styles from './Services.css';
import globalStyles from '../../styles/global.css';
import ServiceDetails from './ServiceDetails';
import Header from '../common/Header';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import TotalAmount from './TotalAmount';
import queryString from 'query-string';
import connect from 'storeon/react/connect'

class Services extends React.Component {
	constructor() {
		super();
		this.state = {
			currentVehicle: ""
		};
	}

	componentDidMount() {
		let queryParams = queryString.parse(this.props.location.search);
		if (queryParams && queryParams.vehicle) {
			this.chooseVehicle(queryParams.vehicle);
		}
	}

	render() {
		//TODO::Find out why multiple renders happen
		let placeHolderItem = <MenuItem disabled value="" key='chooseVehicle'><em>Choose Vehicle</em></MenuItem>;
		const menuItems = [placeHolderItem, ...this.props.vehicles.map((vehicle) => (
			<MenuItem value={vehicle._id} key={vehicle._id} >
				{vehicle.name}
			</MenuItem>
		))];

		return (
			<div className={styles['services']}>
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
          <TotalAmount data={this.props.services} />
					{this.props.services.length > 0 &&
						<ServiceDetails data={this.props.services} />
					}
				</div>
			</div>
		);
	}

	chooseVehicle(id) {
		this.setState({
			currentVehicle: id
		});
		this.getServiceDetailsOf(id);
	}

	getServiceDetailsOf(vehicle) {
		this.props.dispatch('services/get', vehicle);
	}
}

Services.contextTypes = {
	store: PropTypes.object
};

export default connect('vehicles', 'services', Services);