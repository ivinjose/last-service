import React, { useEffect } from 'react';
import styles from './Home.css';
import Header from '../common/Header';
import Button from '@material-ui/core/Button';
import { routeConstants, getRouteDetails } from '../../routes/routes';
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
						vehicles.map((vehicle)=>{
							return(
								<div className={styles['vehicle']} key={vehicle._id}>
								<Button  href={"/services?vehicle="+vehicle._id} label={vehicle.name} color="primary" >
									{vehicle.name}
								</Button>
								</div>
							)
						})
						:<Empty />
				}
				<div className={styles['cta']}>
					<Link to={getRouteDetails(routeConstants.ADD_VEHICLE_DETAILS).path}>Add</Link>
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