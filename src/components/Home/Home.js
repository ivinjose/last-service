import React, { useEffect } from 'react';
import styles from './Home.css';
import Header from '../common/Header';
import Button from '@material-ui/core/Button';
import { routeConstants, getRouteDetails } from '../../routes/routes';
import { Link } from 'react-router-dom';
import makeApiCall from "../../utils/ApiHelper";
import useStoreon from 'storeon/react'

const Home = () => {
	const { user, vehicles, dispatch } = useStoreon('user', 'vehicles');

	const onSuccess = (data) => {
		dispatch('loading:false');
		dispatch('vehicles/get:success', data);
	}

	const onFailure = (error) => {
		dispatch('loading:false');
		dispatch('vehicles/get:error', error);
	}

	useEffect(()=>{
		dispatch('loading:true');
		if( user && user.isLoggedIn ){
			makeApiCall("http://localhost:4001/users/" + user._id + "/vehicles", { method: 'GET' }, onSuccess, onFailure)
		}
	}, [dispatch]);

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