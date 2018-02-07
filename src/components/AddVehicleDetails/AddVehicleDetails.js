import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Header from '../common/Header';
import styles from './AddVehicleDetails.css';
import globalStyles from '../../styles/global.css';
import TextField from 'material-ui/TextField';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import RaisedButton from 'material-ui/RaisedButton';
import Snackbar from 'material-ui/Snackbar';
import fetch from 'isomorphic-fetch';
import queryString from 'query-string';

import functions from './functions';

class AddVehicleDetails extends React.Component {
	constructor() {
		super();

		this.state = {
			editMode: false,
			pageTitle: 'Add vehicle details',
			vehicle: '',
			vehicleType: null,
			snackbarState: false,
			snackbarMessage: " ",
		};
	}

	componentDidMount(){
		this.checkModeAndSetupPage();
	}

	componentWillReceiveProps(){
		this.checkModeAndSetupPage();
	}

	checkModeAndSetupPage(){
		var queryParams = queryString.parse(location.search);
		
		if( queryParams.editMode == 'true' ){
			functions.getVehicleDetails(queryParams.vehicle).then((response)=>{
				this.doEditModeConfiguration(response);
			});
		}else{
			this.doAddModeConfiguration();
		}
	}

	doEditModeConfiguration(vehicle){
		this.setState({
			editMode: true,
			pageTitle: 'Edit vehicle details',
			vehicleId: vehicle._id,
			vehicle: vehicle.name,
			vehicleType: vehicle.type
		});
	}

	doAddModeConfiguration(){
		this.setState({
			editMode: false,
			pageTitle: 'Add vehicle details',
			vehicleId: null,
			vehicle: '',
			vehicleType: null,
		});
	}

	render() {
		return (
			<div className={styles['service-details']}>

				<div className={styles['body']}>
					<div className={globalStyles['row']}>
						<TextField hintText="Vehicle name" value={this.state.vehicle} fullWidth={true} onChange={this.updateVehicle.bind(this)} />
					</div>
					<div className={globalStyles['row']}>
						<SelectField hintText="Vehicle type" fullWidth={true} value={this.state.vehicleType} onChange={this.updateVehicleType.bind(this)}>
							<MenuItem key={"Two wheeler"} value={"Two wheeler"} primaryText="Two wheeler" />
							<MenuItem key={"Four wheeler"} value={"Four wheeler"} primaryText="Four wheeler" />
						</SelectField>
					</div>

					<div  className={globalStyles['row']}>
						<RaisedButton label={this.state.editMode?'Update':'Save'} primary={true} fullWidth={true} onClick={this.saveVehicleDetails.bind(this)}/>
					</div>
				</div>

				<Snackbar
					open={this.state.snackbarState}
					message={this.state.snackbarMessage}
					autoHideDuration={2000}
					onRequestClose={this.handleRequestClose} />

			</div>
		);
	}

	updateVehicle(event, newValue){
		this.setState({
			vehicle: newValue
		});
	}

	updateVehicleType(event, key, payload){
		this.setState({
			vehicleType: payload
		});
	}

	closeSnackbar(){
		this.setState({
			snackbarState: false
		});
	}

	saveVehicleDetails(){
		const obj = {
			vehicleName: this.state.vehicle,
			vehicleType: this.state.vehicleType,
		}
		this.props.addVehicleAsync( obj );
		// functions.saveVehicle(this.state.vehicle, this.state.vehicleType, this.state.editMode).then((response)=>{
		// 	this.setState({
		// 		snackbarState: true,
		// 		snackbarMessage: response.message
		// 	});
		// });
	}

}

AddVehicleDetails.contextTypes = {
	store: PropTypes.object
};

export default AddVehicleDetails;