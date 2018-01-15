import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import styles from './ViewVehicleDetails.css';
import globalStyles from '../../styles/global.css';
import ServiceDetails from '../ServiceDetails';
import Header from '../common/Header';
import VehicleCard from '../common/VehicleCard';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import {List} from 'material-ui/List';
import functions from './functions';

class ViewVehicleDetails extends React.Component {
	constructor() {
		super();
		this.state = {
			vehicles: []
		};
	}

	componentDidMount(){
		functions.getVehiclesList().then((response)=>{
			this.setState({
				vehicles: response.data
			});
		});
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
									<VehicleCard data={vehicle} index={index} showEdit={true}/>
								)
							})
						}
						</List>
						<div className={styles['cta']}>
							<FloatingActionButton secondary={true} onClick={functions.addNew.bind(this)}>
								<ContentAdd />
							</FloatingActionButton>
						</div>
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