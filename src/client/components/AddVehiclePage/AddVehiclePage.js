import React from 'react';
import PropTypes from 'prop-types';
import Header from '../common/Header';
import styles from './AddVehiclePage.css';
import globalStyles from '../../styles/global.css';

import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import connect from 'storeon/react/connect'
import Strings from '../../constants/StringConstants';

class AddVehiclePage extends React.Component {
	constructor() {
		super();

		this.state = {
			vehicle: null
		};

		this.updateVehicle = this.updateVehicle.bind(this);
		this.saveVehicle = this.saveVehicle.bind(this);
	}

	render() {
		return (
			<React.Fragment>
				<Header title={Strings.PAGE_TITLES.ADD_VEHICLE}/>

				<div className={styles['add-vehicle-page']}>
					<div className={globalStyles['row']}>
						<TextField label="Vehicle name" fullWidth={true} onChange={this.updateVehicle} />
					</div>

					<div  className={globalStyles['row']}>
						<Button variant="contained" color="primary" fullWidth={true} onClick={this.saveVehicle}>
							Save
						</Button>
					</div>
				</div>
			</React.Fragment>
		);
	}

	updateVehicle(event){
		this.setState({
			vehicle: event.target.value
		});
	}

	saveVehicle(e){
		if( !this.state.vehicle ){
			this.props.dispatch('snackbar:show', Strings.SNACKBAR_MESSAGES.INVALID_DETAILS);
			return;
		}
		const vehicles = [{ name: this.state.vehicle }];
		this.props.dispatch('vehicles/add', {userId: this.props.user._id, vehicles: vehicles})
	}
}

AddVehiclePage.contextTypes = {
	store: PropTypes.object
};

export default connect('user', AddVehiclePage);