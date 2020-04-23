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
import { saveDocumentAsync } from "../../state/documents";
import ApiConstants from "../../constants/ApiConstants";
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';
import MomentUtils from '@date-io/moment';
import { getTimestampFromMoment } from "../../utils/Helpers";

const AddDocumentPage = (props) => {
	const { user, vehicles, dispatch } = useStoreon('user', 'vehicles');

	const [ vehicle, setVehicle ] = useState();
	const [ documentType, setDocumentType ] = useState();
	const [ renewalDate, setRenewalDate ] = useState(null);
	const [ reminderDate, setReminderDate ] = useState(null);
	const [ comment, setComment ] = useState();

	const setVehicleCb = event => setVehicle(event.target.value);
	const setDocumentTypeCb = event => setDocumentType(event.target.value);
	const setRenewalDateCb = selectedMoment => setRenewalDate(selectedMoment);
	const setReminderDateCb = selectedMoment => setReminderDate(selectedMoment);
	const setCommentCb = event => setComment(event.target.value);

	const clear = () => {
		setVehicle("");
		setDocumentType("");
		setRenewalDate(null);
		setReminderDate(null);
		setComment("");	
	}

	const saveDocument = () => {
		const document = {
			user: user._id,
			vehicle,
			documentType,
			renewalDate: getTimestampFromMoment(renewalDate),
			reminderDate: getTimestampFromMoment(reminderDate),
			comment
		};
		console.log({document});

		saveDocumentAsync( dispatch, document ).then(({status, data: newDocument})=>{
			if( status == ApiConstants.STATUS_SUCCESS ){
				clear();
				// const mutatedNewService = mutateNewServiceForDisplay(newService, vehicles, serviceableComponents);
				// setNewService( mutatedNewService )
			}else{
				dispatch('snackbar:show', Strings.SNACKBAR_MESSAGES.SOMETHING_WENT_WRONG);
			}
		});
	}

	return(
		<React.Fragment>
			<Header location={props.location} />
			<div className={styles['add-document-page']}>
				<FormControl className={styles['form-control']}>
					<InputLabel htmlFor="age-helper">Choose your vehicle</InputLabel>
					<Select
						value={vehicle}
						onChange={setVehicleCb}>
						{ vehicles.map(vehicle => <MenuItem key={vehicle._id} value={vehicle._id} >{vehicle.name}</MenuItem>) }
					</Select>
				</FormControl>

				<Space vertical={25} />
				<TextField
						placeholder="Document type (pollution/insurance etc.)"
						fullWidth={true}
						onChange={setDocumentTypeCb}
						value={documentType} />

				<MuiPickersUtilsProvider utils={MomentUtils}>
					<KeyboardDatePicker
						fullWidth
						disableToolbar
						disablePast
						autoOk
						variant="dialog"
						format="MMMM DD, dddd, YYYY"
						margin="normal"
						id="renewal-date-picker-dialog"
						label="When is the next renewal date?"
						value={renewalDate}
						onChange={setRenewalDateCb}
						KeyboardButtonProps={{
							'aria-label': 'change date',
						}}
					/>
    			</MuiPickersUtilsProvider>

				<MuiPickersUtilsProvider utils={MomentUtils}>
					<KeyboardDatePicker
						fullWidth
						disableToolbar
						disablePast
						autoOk
						variant="dialog"
						format="MMMM DD, dddd, YYYY"
						margin="normal"
						id="reminder-date-picker-dialog"
						label="When do you want to be reminded?"
						value={reminderDate}
						onChange={setReminderDateCb}
						KeyboardButtonProps={{
							'aria-label': 'change date',
						}}
					/>
    			</MuiPickersUtilsProvider>

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