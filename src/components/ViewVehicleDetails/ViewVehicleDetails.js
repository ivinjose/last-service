import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import styles from './ViewVehicleDetails.css';
import globalStyles from '../../styles/global.css';
import ServiceDetails from '../ServiceDetails';
import Header from '../common/Header';
import VehicleCard from '../common/VehicleCard';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import RaisedButton from 'material-ui/RaisedButton';


import {List, ListItem} from 'material-ui/List';
import Divider from 'material-ui/Divider';
import Subheader from 'material-ui/Subheader';
import Avatar from 'material-ui/Avatar';
import {grey400, darkBlack, lightBlack} from 'material-ui/styles/colors';
import IconButton from 'material-ui/IconButton';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';

import fetch from 'isomorphic-fetch';

const iconButtonElement = (
	<IconButton
	  touch={true}
	  tooltip="more"
	  tooltipPosition="bottom-left"
	>
	  <MoreVertIcon color={grey400} />
	</IconButton>
);

const rightIconMenu = (
	<IconMenu iconButtonElement={iconButtonElement}>
	  <MenuItem>Reply</MenuItem>
	  <MenuItem>Forward</MenuItem>
	  <MenuItem>Delete</MenuItem>
	</IconMenu>
);

class ViewVehicleDetails extends React.Component {
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
		// if( this.state && this.state.vehicles && this.state.vehicles.length>0 ){
			return (
				<div className={styles['home']}>
					<Header title={"Service Manager"}/>
					
					<div className={styles['body']}>
						<List>
						{
							this.state.vehicles.map(function(vehicle, index){
								return(
									<VehicleCard data={vehicle} index={index} />
								)
							})
						}
						</List>
						<div className={styles['cta']}>
							<FloatingActionButton secondary={true} onClick={this.addNew.bind(this)}>
								<ContentAdd />
							</FloatingActionButton>
						</div>
					</div>
				</div>
			)
		// }
	}

	addNew(){

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
			console.log(response);
			_this.setState({
				vehicles: response.data
			});
		}).catch(function(error){
			console.log(error);
			console.log('some error');
		});
	}

}

ViewVehicleDetails.contextTypes = {
	store: PropTypes.object
};

export default ViewVehicleDetails;