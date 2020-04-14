import React, { useEffect } from 'react';
import styles from './HomePage.css';
import Header from '../common/Header';
import Space from '../common/Stylers/Space';
import { routeConstants, getRouteDetails } from '../../routes/routes';
import Strings from '../../constants/StringConstants';
import Vehicle, { VehicleEmpty } from "./Vehicle";
import { Link } from 'react-router-dom';
import lizard from '../../images/lizard.jpg';
import useStoreon from 'storeon/react'

const HomePage = () => {
	const { user, vehicles, loading, dispatch } = useStoreon('user', 'vehicles', 'loading');

	useEffect(()=>{
		if( user && user.isLoggedIn ){
			dispatch('vehicles/get', user._id);
		}
	}, []);

	return(
		<React.Fragment>
			<Header title={Strings.PAGE_TITLES.HOME} user={user}/>
			<div className={styles['home-page']}>
				{
					loading?
						<Loader />
						:vehicles.length == 0 ?
							<Empty />
							:
							<React.Fragment>
								<Vehicles vehicles={vehicles} />
								<Space vertical={15} />
								<div className={styles['button']}>
									<Link to={getRouteDetails(routeConstants.ADD_VEHICLE_DETAILS).path}>{Strings.CTA_TEXT.ADD_VEHICLE}</Link>
								</div>
							</React.Fragment>
				}
			</div>
		</React.Fragment>
	);
}

const Vehicles = ({vehicles}) => vehicles.map( vehicle => <Vehicle key={vehicle._id} {...vehicle} />);

const Loader = () => {
	return (
		<React.Fragment>
			<VehicleEmpty />
			<VehicleEmpty />
		</React.Fragment>
	);
}

const Empty = () => {
	return (
		<div className={styles['empty']}>
			<img className={styles['image']} src={lizard} />
			<div>It's so empty in here!</div>
		</div>
	);
};

export default HomePage;