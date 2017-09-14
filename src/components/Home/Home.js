import React from 'react';
import PropTypes from 'prop-types';
import { browserHistory } from 'react-router'; 
import styles from './Home.css';
import Header from '../common/Header';
import ServiceDetails from '../ServiceDetails';
import AddServiceDetails from '../AddServiceDetails';
import Vehicle from './Vehicle';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import routes from '../../routes/routes';

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
									<Vehicle data={{name: vehicle.name}}/>
								)
							})
						}
					</div>
					<div className={styles['cta']}>
						<FloatingActionButton onClick={this.addNew.bind(this)}>
							<ContentAdd />
						</FloatingActionButton>
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
							<FloatingActionButton onClick={this.addNew.bind(this)}>
								<ContentAdd />
							</FloatingActionButton>
						</div>
					</div>
				</div>
			)
		}
	}

	addNew(){
		browserHistory.push( routes[1].path );
	}

	getVehiclesList(){
		var _this = this;
		fetch('http://localhost:4001/getvehicles', 
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