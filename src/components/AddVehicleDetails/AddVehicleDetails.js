import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Header from '../common/Header';
import styles from './AddVehicleDetails.css';
import globalStyles from '../../styles/global.css';

import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';

import fetch from 'isomorphic-fetch';

class AddVehicleDetails extends React.Component {
	constructor() {
		super();

		this.state = {
			vehicle: null,
			snackbarState: false,
			snackbarMessage: " ",
		};

		this.closeSnackbar = this.closeSnackbar.bind(this);
		this.updateVehicle = this.updateVehicle.bind(this);
		this.saveVehicle = this.saveVehicle.bind(this);
	}

	render() {
		return (
			<div className={styles['service-details']}>
				<Header title={"Add vehicle details"}/>

				<div className={styles['body']}>
					<div className={globalStyles['row']}>
						<TextField label="Vehicle name" fullWidth={true} onChange={this.updateVehicle} />
					</div>

					<div  className={globalStyles['row']}>
						<Button variant="contained" color="primary" fullWidth={true} onClick={this.saveVehicle}>
							Save
						</Button>
					</div>
				</div>

				<Snackbar
					open={this.state.snackbarState}
					message={this.state.snackbarMessage}
					autoHideDuration={1000}
					onClose={this.closeSnackbar}
					/>

			</div>
		);
	}

	updateVehicle(event){
		//TODO:: Debug why the data is not getting saved into DB.
		this.setState({
			vehicle: event.target.value
		});
	}

	closeSnackbar(){
		this.setState({
			snackbarState: false
		});
	}

	saveVehicle(e){
		let data = [{ name: this.state.vehicle }];

		let _this = this;

		console.log('data',data);

		fetch('http://localhost:4001/users/5a86de0b90d792bccf3c3404/vehicles', 
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