import React, { useState } from 'react';
import Header from '../common/Header';
import Space from '../common/Stylers/Space';
import styles from './AddDocumentPage.css';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import useStoreon from 'storeon/react'
import Strings from '../../constants/StringConstants';

const AddDocumentPage = () => {
	const { user, vehicles, dispatch } = useStoreon('user', 'vehicles');

	const [ vehicle, setVehicle ] = useState();
	const [ documentType, setDocumentType ] = useState();
	const [ renewalDate, setRenewalDate ] = useState();
	const [ reminderDate, setReminderDate ] = useState();
	const [ comment, setComment ] = useState();

	const setVehicleCb = event => setVehicle(event.target.value);
	const setDocumentTypeCb = event => setDocumentType(event.target.value);
	const setRenewalDateCb = event => setRenewalDate(event.target.value);
	const setReminderDateCb = event => setReminderDate(event.target.value);
	const setCommentCb = event => setComment(event.target.value);

	const clear = () => {
		setVehicle("");
		setDocumentType("");
		setRenewalDate("");
		setReminderDate("");
		setComment("");	
	}

	const saveDocument = () => {
		const document = {
			user: user._id,
			vehicle,
			documentType,
			renewalDate,
			reminderDate,
			comment
		};
		clear();
		console.log({document});
	}

	return(
		<React.Fragment>
			<Header title={Strings.PAGE_TITLES.ADD_DOCUMENT} />
			<div className={styles['add-document-page']}>
				<FormControl className={styles['form-control']}>
					<InputLabel htmlFor="age-helper">Choose your vehicle</InputLabel>
					<Select
						value={vehicle}
						onChange={setVehicleCb}>
						{ vehicles.map(vehicle => <MenuItem key={vehicle._id} value={vehicle._id} >{vehicle.name}</MenuItem>) }
					</Select>
				</FormControl>

				<Space vertical={20} />
				<TextField
						placeholder="Document type (pollution/insurance etc.)"
						fullWidth={true}
						onChange={setDocumentTypeCb}
						value={documentType} />

				<Space vertical={20} />
				<TextField
					type="date"
					placeholder="When is the next renewal date?"
					onChange={setRenewalDateCb}
					fullWidth={true}
					value={renewalDate} />	
				
				<Space vertical={20} />
				<TextField
					type="date"
					placeholder="When do you want to be reminded?"
					onChange={setReminderDateCb}
					fullWidth={true}
					value={reminderDate} />	

				<Space vertical={20} />
				<TextField
						placeholder="Extra info (policy number/ agent name etc.)"
						fullWidth={true}
						onChange={setCommentCb}
						value={comment} />

				<Space vertical={30} />
				<Button variant="contained" color="primary" fullWidth={true} onClick={saveDocument}>Save</Button>
			</div>
		</React.Fragment>
	)
};

export default AddDocumentPage;