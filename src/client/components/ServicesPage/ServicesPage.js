import React from 'react';
import PropTypes from 'prop-types';
import queryString from 'query-string';
import connect from 'storeon/react/connect'

import Header from '../common/Header';
import Space from '../common/Stylers/Space';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import TotalAmount from './TotalAmount';
import Service, { ServiceEmpty } from '../common/Service';

import styles from './ServicesPage.css';
import globalStyles from '../../styles/global.css';
import svg from '../../images/notfound.svg';
import Strings from '../../constants/StringConstants';

class ServicesPage extends React.Component {
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
		const placeHolderItem = <MenuItem disabled value="" key='chooseVehicle'><em>Choose Vehicle</em></MenuItem>;
		const menuItems = [placeHolderItem, ...this.props.vehicles.map((vehicle) => (
			<MenuItem value={vehicle._id} key={vehicle._id} >
				{vehicle.name}
			</MenuItem>
		))];

		return (
			<React.Fragment>
				<Header title={Strings.PAGE_TITLES.SERVICES} />
				<div className={styles['services-page']}>
					<Space vertical={15} />
					<div className={globalStyles['row']}>
						<Select
							displayEmpty
							value={this.state.currentVehicle}
							onChange={(e) => this.chooseVehicle(e.target.value)}
							className={styles['select-cmp']}>
							{menuItems}
						</Select>
					</div>
					
					<Space vertical={15} />
					{renderServices(this.props.services, this.props.loading)}
				</div>
			</React.Fragment>
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

const renderServices = (services, loading) =>{
	if( loading ){
		return <Loader />
	}else{
		if( services.length == 0 ){
			return <EmptyServices />;
		}else{
			return(
				<React.Fragment>
					<TotalAmount services={services} />
					{
						services.map( service =>{
							return <Service service={service} />
						})
					}
				</React.Fragment>
			)
		}
	}
}

const Loader = () => {
	return (
		<React.Fragment>
			<ServiceEmpty />
			<ServiceEmpty />
		</React.Fragment>
	);
}

const EmptyServices = () => {
	return (
		<div className={styles['empty-view']}>
			<h3>Looks like you haven't selected anything?</h3>
			<div className={styles['avatar']}>
				<img src={svg}/>
			</div>
		</div>
	); 
};

ServicesPage.contextTypes = {
	store: PropTypes.object
};

export default connect('vehicles', 'services', 'loading', ServicesPage);