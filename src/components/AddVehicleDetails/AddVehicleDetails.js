import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Header from '../common/Header';
import styles from './AddVehicleDetails.css';
import globalStyles from '../../styles/global.css';
import {addServiceDetails} from '../../actions/actionCreators';

import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import Snackbar from 'material-ui/Snackbar';

import fetch from 'isomorphic-fetch';

class AddVehicleDetails extends React.Component {
	constructor() {
		super();

		this.state = {
			vehicle: null,
			snackbarState: false,
			snackbarMessage: " ",
		};
	}

	render() {
		return (
			<div className={styles['service-details']}>
				<Header title={"Add vehicle details"}/>

				<div className={styles['body']}>
					<div className={globalStyles['row']}>
						<TextField hintText="Vehicle name" fullWidth={true} onChange={this.updateVehicle.bind(this)} />
					</div>

					<div  className={globalStyles['row']}>
						<RaisedButton label="Save" primary={true} fullWidth={true} onClick={this.saveVehicle.bind(this)}/>
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

	closeSnackbar(){
		this.setState({
			snackbarState: false
		});
	}

	saveVehicle(e){
		let { store } = this.context;
		let vehicle = { name: this.state.vehicle };

		let data = Object.assign( {}, vehicle );
		let _this = this;

		fetch('http://localhost:4001/addvehicledetails', 
		{ 
			method: 'POST', 
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(data) 
				   
		}).then(function(response){
			return( response.text() );
		}).then(function(response){
			return JSON.parse(response);
		}).then(function(response){
			_this.setState({
				snackbarState: true,
				snackbarMessage: response.message
			});
		}).catch(function(error){
			_this.setState({
				snackbarState: true,
				snackbarMessage: error
			});
		});

	}
}

AddVehicleDetails.contextTypes = {
	store: PropTypes.object
};

export default AddVehicleDetails;