import React, { useEffect } from 'react';
import styles from './VehiclesPage.css';
import Header from '../common/Header';
import Space from '../common/Stylers/Space';
import { routeConstants, getRouteDetailsFromKey } from '../../routes/routes';
import Strings from '../../constants/StringConstants';
import Vehicle, { VehicleEmpty } from "./Vehicle";
import { Link } from 'react-router-dom';
import lizard from '../../images/lizard.jpg';
import useStoreon from 'storeon/react'

const VehiclesPage = (props) => {
	const { user, vehicles, loading, dispatch } = useStoreon('user', 'vehicles', 'loading');

	useEffect(()=>{
		if( user && user.isLoggedIn ){
			dispatch('vehicles/get', user._id);
		}
	}, []);

	return(
		<React.Fragment>
			<Header location={props.location} user={user}/>
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
									<Link to={getRouteDetailsFromKey(routeConstants.ADD_VEHICLE).path}>{Strings.CTA_TEXT.ADD_VEHICLE}</Link>
								</div>
							</React.Fragment>
				}
			</div>
		</React.Fragment>
	);
}

const Vehicles = ({vehicles}) => vehicles.map( vehicle => <Link className={styles['link']} to={"/services?vehicle="+vehicle._id}><Vehicle key={vehicle._id} {...vehicle} /></Link>);

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

export default VehiclesPage;