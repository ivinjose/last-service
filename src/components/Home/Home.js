import React from 'react';
import PropTypes from 'prop-types';
import styles from './Home.css';
import Header from '../common/Header';
import ServiceDetails from '../ServiceDetails';
import AddServiceDetails from '../AddServiceDetails';
import VehicleCard from '../common/VehicleCard';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import RaisedButton from 'material-ui/RaisedButton';
import RefreshIndicator from 'material-ui/RefreshIndicator';
import fetch from 'isomorphic-fetch';
import functions from './functions';

class Home extends React.Component {
	componentDidMount(){
		this.props.getAllVehiclesAsync();
		this.props.getAllServicesAsync();
	}
 
	render() {
		if( this.props.vehicles.length>0 ){
			return (
				<div className={styles['home']}>
				<h1 className={styles['header']}>VEHICLES</h1>
					<div className={styles['body']}>
						{
							this.props.vehicles.map(function(vehicle, index){
								return(
									<div className={styles['vehicle']} key={index}>
										<VehicleCard data={vehicle} index={index} showEdit={false}/>
									</div>
								)
							})
						}
						<div className={styles['cta']}>
							<FloatingActionButton secondary={true} onClick={functions.addNew.bind(this)}>
								<ContentAdd />
							</FloatingActionButton>
						</div>
					</div>
				</div>
			)
		}else{
			return (
				<div className={styles['home']}>
					<div className={styles['body']}>
						<Empty />
						<div className={styles['cta']}>
							<FloatingActionButton onClick={functions.addNew.bind(this)}>
								<ContentAdd />
							</FloatingActionButton>
						</div>
					</div>
				</div>
			)
		}
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