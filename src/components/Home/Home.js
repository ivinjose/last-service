import React, { useEffect } from 'react';
import styles from './Home.css';
import Header from '../common/Header';
import { routeConstants, getRouteDetails } from '../../routes/routes';
import Strings from '../../constants/StringConstants';
import Vehicle from "./Vehicle";
import { Link } from 'react-router-dom';
import useStoreon from 'storeon/react'

const Home = () => {
	const { user, vehicles, dispatch } = useStoreon('user', 'vehicles');

	useEffect(()=>{
		if( user && user.isLoggedIn ){
			dispatch('vehicles/get', user._id);
		}
	}, []);

	return(
		<div className={styles['home']}>
			<Header title={"Service Manager"}/>
			<div className={styles['body']}>
				{
					vehicles.length>0?
						vehicles.map( vehicle => <Vehicle key={vehicle._id} {...vehicle} /> )
						:<Empty />
				}
				<div className={styles['button']}>
					<Link to={getRouteDetails(routeConstants.ADD_VEHICLE_DETAILS).path}>{Strings.ADD_VEHICLE}</Link>
				</div>
			</div>
		</div>
	);
}

const Empty = () => {
	return (
		<div className={styles['empty']}>
			<div className={styles['text1']}>Uh oh!</div>
			<div className={styles['text2']}>It looks all empty in here.</div>
			<div className={styles['text3']}>Why don't you add some?</div>
		</div>
	);
};

export default Home;