import React, { useState, useEffect }  from 'react';
import Header from '../common/Header';
import Space from '../common/Stylers/Space';
import Service from '../common/Service';
import styles from './AddServicePage.css';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';
import MomentUtils from '@date-io/moment';
import Button from '@material-ui/core/Button';
import Strings from '../../constants/StringConstants';
import { saveServiceAsync } from "../../state/services";
import ApiConstants from "../../constants/ApiConstants";
import useStoreon from 'storeon/react'
import { getVehicleFromLocation, mutateNewServiceForDisplay } from "./helpers";
import { routeConstants, getRouteDetailsFromPath } from '../../routes/routes';
import { getTimestampFromMoment } from "../../utils/Helpers";


const AddServicePage = (props) => {
	const { user, vehicles, serviceableComponents, dispatch } = useStoreon('user', 'vehicles', 'serviceableComponents');
	const [ vehicleId, setVehicleId ] = useState("");
	const [ date, setDate ] = useState(null);
	const [ component, setComponent ] = useState("");
	const [ amount, setAmount ] = useState("");
	const [ comment, setComment ] = useState("");
	const [ newService, setNewService ] = useState(null);
	const [ editMode, setEditMode ] = useState(false);

	useEffect(() => {
		if( getRouteDetailsFromPath( props.location.pathname ).key === routeConstants.EDIT_SERVICE ){
			setEditMode(true)
		}
		const vehicleFromLocation = getVehicleFromLocation(props.location);
		vehicleFromLocation && setVehicleId( vehicleFromLocation );
	},[]);

	const updateVehicleIdCb = event => setVehicleId(event.target.value);
	const updateDateCb = selectedMoment => setDate(selectedMoment);
	const updateComponentCb = event => setComponent(event.target.value); 
	const updateAmountCb = event => setAmount(event.target.value); 
	const updateCommentCb = event => setComment(event.target.value); 

	const clear = () => {
		setVehicleId("");
		setDate(null);
		setComponent("");
		setAmount("");
		setComment("");
	}

	const saveService = () => {
		if( !(vehicleId && date && component && amount) ){
			dispatch('snackbar:show', Strings.SNACKBAR_MESSAGES.INVALID_DETAILS);
			return;
		}
		const service = { user: user._id, vehicle: vehicleId, date: getTimestampFromMoment(date), component, amount, comment };

		saveServiceAsync( dispatch, service ).then(({status, data: newService})=>{
			if( status == ApiConstants.STATUS_SUCCESS ){
				// props.history.push(getRouteDetailsFromKey(routeConstants.ADD_SERVICE).path);
				const mutatedNewService = mutateNewServiceForDisplay(newService, vehicles, serviceableComponents);
				clear();
				setNewService( mutatedNewService );
			}else{
				dispatch('snackbar:show', Strings.SNACKBAR_MESSAGES.SOMETHING_WENT_WRONG);
			}
		});
	}

	return (
		<React.Fragment>
			<Header location={props.location} />

			<div className={styles['add-service-page']}>
				<FormControl className={styles['form-control']} disabled={editMode} >
					<InputLabel>Choose your vehicle</InputLabel>
					<Select
						value={vehicleId}
						onChange={updateVehicleIdCb}>
						{ vehicles.map(vehicle => <MenuItem key={vehicle._id} value={vehicle._id} >{vehicle.name}</MenuItem> ) }
					</Select>
				</FormControl>

				<MuiPickersUtilsProvider utils={MomentUtils}>
					<KeyboardDatePicker
						fullWidth
						disableToolbar
						disableFuture
						autoOk
						variant="dialog"
						format="MMMM DD, dddd, YYYY"
						margin="normal"
						id="date-picker-inline"
						label="On which date service happened?"
						value={date}
						onChange={updateDateCb}
						KeyboardButtonProps={{
							'aria-label': 'change date',
						}}
					/>
    			</MuiPickersUtilsProvider>
				<Space vertical={10} />

				<FormControl className={styles['form-control']}>
					<InputLabel>Type of service / Component</InputLabel>
					<Select value={component} onChange={updateComponentCb}>
						{ serviceableComponents.map(component => <MenuItem key={component.id} value={component.id} >{component.label}</MenuItem>) }
					</Select>
				</FormControl>
				<Space vertical={25} />

				<TextField
					placeholder="How much you paid?"
					fullWidth={true}
					onChange={updateAmountCb}
					value={amount} />
				<Space vertical={25} />

				<TextField
					placeholder="Any comments? (Optional)"
					fullWidth={true}
					onChange={updateCommentCb}
					value={comment} />
				<Space vertical={35} />

				<Button variant="contained" color="primary" fullWidth={true} onClick={saveService}>Save</Button>
			</div>

			<Space vertical={35} />
			{
				newService &&
				<Service service={newService} style={{paddingLeft: '15px', paddingRight: '15px', border:'none', backgroundColor: '#34e79a8f', borderRadius:'3px', marginLeft:'15px', marginRight:'15px'}} />
			}
		</React.Fragment>
	);
}

export default AddServicePage;