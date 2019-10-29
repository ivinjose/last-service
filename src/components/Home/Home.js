import React from 'react';
import styles from './Home.css';
import Header from '../common/Header';
import Button from '@material-ui/core/Button';
import {  routeConstants, getRouteDetails } from '../../routes/routes';
import { Link } from 'react-router-dom';

import fetch from 'isomorphic-fetch';

class Home extends React.Component {
	constructor() {
		super();
		this.state = {
			vehicles: []
		};
	}

	componentDidMount(){
		this.getVehiclesList();
	}

	render(){
		return(
			<div className={styles['home']}>
				<Header title={"Service Manager"}/>
				<div className={styles['body']}>
					{
						this.state.vehicles.length > 0 ?
							this.state.vehicles.map(function(vehicle, index){
								return(
									<div className={styles['vehicle']} key={index}>
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

	getVehiclesList(){
		var _this = this;
		fetch('http://localhost:4001/users/5a86de0b90d792bccf3c3404/vehicles', 
		{ 
			method: 'GET', 
			headers: {
				'Content-Type': 'application/json'
			}

		}).then(function(response){
			return( response.text() );
		}).then(function(response){
			return JSON.parse(response);
		}).then(function(response){
			_this.setState({
				vehicles: response.data
			});
		}).catch(function(error){
			console.log(error);
		});
	}
}

class Empty extends React.Component{
	constructor(){
		super();
	}

	render(){
		return (
			<div className={styles['empty']}>
				<div className={styles['text1']}>Uh oh!</div>
				<div className={styles['text2']}>It looks all empty in here.</div>
				<div className={styles['text3']}>Why don't you add some?</div>
			</div>
		);
	}
}

export default Home;