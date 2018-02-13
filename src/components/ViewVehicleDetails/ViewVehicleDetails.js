import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import styles from './ViewVehicleDetails.css';
import globalStyles from '../../styles/global.css';
import ServiceDetails from '../ServiceDetails';
import Header from '../common/Header';
import VehicleCard from '../common/VehicleCard';
import {List} from 'material-ui/List';

class ViewVehicleDetails extends React.Component {
 
	render() {
		// if( this.state && this.state.vehicles && this.state.vehicles.length>0 ){
			return (
				<div className={styles['vehicle-details']}>
					<h1 className={styles['header']}>VEHICLES</h1>					
					<div className={styles['body']}>
						<List>
						{
							this.props.vehicles.map(function(vehicle, index){
								return(
									<VehicleCard data={vehicle} index={index} showEdit={true}/>
								)
							})
						}
						</List>
					</div>
				</div>
			)
		// }
	}
}

ViewVehicleDetails.contextTypes = {
	store: PropTypes.object
};

export default ViewVehicleDetails;