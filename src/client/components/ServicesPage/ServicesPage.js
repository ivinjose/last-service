import React, { useState, useEffect } from 'react';
import queryString from 'query-string';
import Header from '../common/Header';
import Space from '../common/Stylers/Space';
import Select from '@material-ui/core/Select';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import MenuItem from '@material-ui/core/MenuItem';
import TotalAmount from './TotalAmount';
import Service, { ServiceEmpty } from '../common/Service';
import useStoreon from 'storeon/react'
import styles from './ServicesPage.css';
import lizard from '../../images/lizard.jpg';
import { getDateStringFromTimestamp } from "../../utils/Helpers";
import { getRouteDetailsFromKey, routeConstants } from "../../routes/routes";
import { Link } from 'react-router-dom';

const ServicesPage = (props) => {
	const { services, vehicles, serviceableComponents, loading, dispatch } = useStoreon('services', 'vehicles', 'serviceableComponents', 'loading');

	const [ vehicle, setVehicle ] = useState("");
	const setVehicleCb = event => {
		setVehicle(event.target.value);
		getServices(event.target.value);
	} 

	useEffect(()=>{
		dispatch('services/clear');
		const queryParams = queryString.parse(props.location.search);
		if (queryParams && queryParams.vehicle) {
			setVehicle(queryParams.vehicle);
			getServices(queryParams.vehicle);
		}
	}, []);

	const getServices = (selectedVehicle) => {
		dispatch('services/get', selectedVehicle);
	}

	const placeHolderItem = <MenuItem disabled value="" key='chooseVehicle'><em>Choose Vehicle</em></MenuItem>;
	const menuItems = [placeHolderItem, ...vehicles.map((vehicle) => (
		<MenuItem value={vehicle._id} key={vehicle._id} >
			{vehicle.name}
		</MenuItem>
	))];

	return (
		<React.Fragment>
			<Header location={props.location} />
			<div className={styles['services-page']}>
				<Space vertical={15} />
				<Select
					displayEmpty
					value={vehicle}
					onChange={setVehicleCb}
					className={styles['select-cmp']}>
					{menuItems}
				</Select>
				
				<Space vertical={15} />
				{renderServices(vehicle, services, loading, serviceableComponents, props.history)}
			</div>
		</React.Fragment>
	);
}

const getOptionsMenu = (history, serviceId) => {
	return [
		{
			label: 'Edit',
			action: (e) => {
				e.stopPropagation();
				history.push(`${getRouteDetailsFromKey(routeConstants.EDIT_SERVICE).path}?service=${serviceId}`);
			}
		},
		{
			label: 'Delete',
			action: (e) => {
				e.stopPropagation();
				//dispatch the action to delete on confirmation
				console.log('delete')
			}
		}
	];
};

const renderServices = (vehicleSelected, services, loading, components, history) =>{
	if( loading ){
		return <Loader />
	}else{
		if( services.length == 0 ){
			return <Empty vehicleSelected={vehicleSelected}/>;
		}else{
			return(
				<React.Fragment>
					<TotalAmount services={services} />
					<div>
					{
						services.map( service =>{
							service.vehicle = null; /** Setting it to null because no point in repeating the vehicle name in the services page */
							service.date = getDateStringFromTimestamp(service.date);
							const serviceId = service._id;
							const component = components.find( component => component.id === service.component );
							service.component = component? component.label : null;
							return <Service service={service} key={serviceId} optionsMenu={getOptionsMenu(history, service._id)}/>
						})
					}
					</div>
					<Fab className={styles['fab']} color="primary" aria-label="add">
						<Link to={getRouteDetailsFromKey(routeConstants.ADD_SERVICE).path+"?vehicle="+vehicleSelected}>
							<AddIcon style={{color: '#fff'}} />
						</Link>
					</Fab>
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

const Empty = ({vehicleSelected}) => {
	return (
		<div className={styles['empty']}>
			<img className={styles['image']} src={lizard} />
			<div>It's so empty in here!</div>
			<Fab className={styles['fab']} color="primary" aria-label="add">
				<Link to={getRouteDetailsFromKey(routeConstants.ADD_SERVICE).path+"?vehicle="+vehicleSelected}>
					<AddIcon style={{color: '#fff'}} />
				</Link>
			</Fab>
		</div>
	);
};

export default ServicesPage;