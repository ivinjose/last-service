import React from 'react';
import PropTypes from 'prop-types';
import Header from '../common/Header';
import styles from './AddVehicleDetails.css';
import globalStyles from '../../styles/global.css';

import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import connect from 'storeon/react/connect'

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
		const vehicles = [{ name: this.state.vehicle }];
		this.props.dispatch('vehicles/add', {userId: this.props.user._id, vehicles: vehicles})
	}
}

AddVehicleDetails.contextTypes = {
	store: PropTypes.object
};

export default connect('user', AddVehicleDetails);