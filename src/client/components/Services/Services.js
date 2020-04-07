import React from 'react';
import PropTypes from 'prop-types';
import queryString from 'query-string';
import connect from 'storeon/react/connect'

import Header from '../common/Header';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import TotalAmount from './TotalAmount';
import Service from './Service';

import styles from './Services.css';
import globalStyles from '../../styles/global.css';
import svg from '../../images/notfound.svg';

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
							className={styles['select-cmp']}>
							{menuItems}
						</Select>
					</div>
					
					<TotalAmount services={this.props.services} />
					{renderServices(this.props.services)}
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

const renderServices = (services) =>{
	if( services.length > 0 ){
		return services.map( service =>{
			return <Service {...service} />
		});
	}else {
		return <EmptyServices />
	}
}

const EmptyServices = () => {
	return (
		<div className={styles['empty-view']}>
			<h3>"Oops! no data available"</h3>
			<div className={styles['avatar']}>
				<img src={svg}/>
			</div>
		</div>
	); 
};

Services.contextTypes = {
	store: PropTypes.object
};

export default connect('vehicles', 'services', Services);