import React from 'react';
import PropTypes from 'prop-types';
import { browserHistory } from 'react-router'; 
import styles from './Home.css';
import Header from '../common/Header';
import ServiceDetails from '../ServiceDetails';
import AddServiceDetails from '../AddServiceDetails';
import Vehicle from './Vehicle';
import Button from '@material-ui/core/Button';
import { routes, routeConstants, getRouteDetails } from '../../routes/routes';

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
 
	render() {
		if( this.state && this.state.vehicles && this.state.vehicles.length>0 ){
			return (
				<div className={styles['home']}>
					<Header title={"Service Manager"}/>
					<div className={styles['body']}>
						{
							this.state.vehicles.map(function(vehicle, index){
								return(
									<div className={styles['vehicle']} key={index}>
									<Button  href={"/services?vehicle="+vehicle._id} label={vehicle.name} color="primary" >
										{vehicle.name}
									</Button>
									</div>
								)
							})
						}
						<div className={styles['cta']}>
							<Button variant="contained" aria-label="add" color="secondary" onClick={this.addNew.bind(this)}>
								Add
							</Button>
						</div>
					</div>
				</div>
			)
		}else{
			return (
				<div className={styles['home']}>
					<Header title={"Service Manager"}/>
					<div className={styles['body']}>
						<Empty />
						<div className={styles['cta']}>
							<Button color="primary" aria-label="add" onClick={this.addNew.bind(this)}>
								Add
							</Button>
						</div>
					</div>
				</div>
			)
		}
	}

	addNew(){
		browserHistory.push( getRouteDetails(routeConstants.ADD_VEHICLE_DETAILS).path );
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
			console.log('some errors');
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