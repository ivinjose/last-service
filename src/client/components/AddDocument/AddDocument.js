import React from 'react';
import Header from '../common/Header';
import Space from '../common/Stylers/Space';
import styles from './AddDocument.css';

import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';

import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import useStoreon from 'storeon/react'

import Strings from '../../constants/StringConstants';

let DateTimeFormat = global.Intl.DateTimeFormat; //IntlPolyfill.DateTimeFormat;

const AddDocument = () => {
	const { user, vehicles, dispatch } = useStoreon('user', 'vehicles');
	let currentVehicle, name, renewalDate, expiryDate, reminderDate, extraInfo;

	const setCurrentVehicle = (event) => {
		const currentVehicleId = event.target.value;
		currentVehicle = vehicles.find( vehicle => vehicle._id === currentVehicleId);
	}

	const setName = (event) => {
		name = event.target.value;
	}

	const setRenewalDate = (event) => {
		renewalDate = event.target.value;
	}

	const setReminderDate = (event) => {
		reminderDate = event.target.value;
	}

	const setExtraInfo = (event) => {
		extraInfo = event.target.value;
	}

	const saveDocument = () => {
		const document = {
			currentVehicle,
			name,
			extraInfo,
			renewalDate,
			reminderDate
		};

		console.log({document});
	}

	return(
		<React.Fragment>
			<Header title={Strings.PAGE_TITLES.ADD_DOCUMENT} />
			<div className={styles['add-document']}>
				<FormControl className={styles['form-control']}>
					<InputLabel htmlFor="age-helper">Choose your vehicle</InputLabel>
					<Select
						value={currentVehicle}
						onChange={setCurrentVehicle}>
						{
							vehicles.map(vehicle => <MenuItem key={vehicle._id} value={vehicle._id} >{vehicle.name}</MenuItem>)
						}
					</Select>
				</FormControl>

				<Space vertical={20} />
				<TextField
						placeholder="Document name (pollution/insurance etc.)"
						fullWidth={true}
						onChange={setName}
						value={name} />

				<Space vertical={20} />
				<TextField
						placeholder="Extra info (policy number/ agent name etc.)"
						fullWidth={true}
						onChange={setExtraInfo}
						value={extraInfo} />

				<Space vertical={20} />
				<TextField
					type="date"
					placeholder="When is the next renewal date?"
					onChange={setRenewalDate}
					fullWidth={true}
					value={renewalDate} />	

				<Space vertical={20} />
				<TextField
					type="date"
					placeholder="When do you want to be reminded?"
					onChange={setReminderDate}
					fullWidth={true}
					value={reminderDate} />	

				<Space vertical={20} />
				<Button variant="contained" color="primary" fullWidth={true} onClick={saveDocument}>Save</Button>
			</div>
		</React.Fragment>
	)
};

export default AddDocument;