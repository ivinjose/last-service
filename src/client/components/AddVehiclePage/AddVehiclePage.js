import React, { useState } from 'react';
import useStoreon from 'storeon/react'
import Header from '../common/Header';
import Space from '../common/Stylers/Space';
import Input from "../common/Input";
import styles from './AddVehiclePage.css';
import Button from '@material-ui/core/Button';
import Strings from '../../constants/StringConstants';
import { saveVehiclesAsync } from "../../state/vehicles";
import { getRouteDetailsFromKey, routeConstants } from "../../routes/routes";
import ApiConstants from "../../constants/ApiConstants";

import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';

const AddVehiclePage = (props) => {
	const { user, dispatch } = useStoreon('user');

	const [ name, setName ] = useState();
	const [ type, setType ] = useState();
	const [ registration, setRegistration ] = useState();

	const updateNameCb = event => setName(event.target.value);
	const updateTypeCb = event => setType(event.target.value);
	const updateRegistrationCb = event => setRegistration(event.target.value);

	const saveVehicle = () => {
		if( !(name && type) ){
			dispatch('snackbar:show', Strings.SNACKBAR_MESSAGES.INVALID_DETAILS);
			return;
		}

		const vehicle = { name, type, registration };

		saveVehiclesAsync( dispatch, {userId: user._id, vehicles: [vehicle]} ).then(({status, data, message})=>{
			if( status == ApiConstants.STATUS_SUCCESS ){
				props.history.push(getRouteDetailsFromKey(routeConstants.ADD_SERVICE).path);
			}else{
				dispatch('snackbar:show', Strings.SNACKBAR_MESSAGES.SOMETHING_WENT_WRONG);
			}
		});
	}
	
	return (
		<React.Fragment>
			<Header location={props.location}/>

			<div className={styles['add-vehicle-page']}>
				<FormControl className={styles['vehicle-type-form']}>
					<InputLabel>Type of vehicle</InputLabel>
					<Select
						value={type}
						onChange={updateTypeCb}>
						<MenuItem key="two-wheeler" value="two-wheeler" >Two wheeler</MenuItem>
						<MenuItem key="four-wheeler" value="four-wheeler" >Four wheeler</MenuItem>
						<MenuItem key="other" value="other" >other</MenuItem>	
					</Select>
				</FormControl>
				<Space vertical={25} />

				<Input type="text" name="name" placeholder="Vehicle Name" style={{width: '100%'}} onChange={updateNameCb} />
				<Space vertical={25} />

				{/* <select className={styles['vehicle-type']} name="vehicle-type" onChange={updateTypeCb}>
					<option value="">Type of vehicle?</option>
					<option value="two-wheeler">Two wheeler</option>
					<option value="four-wheeler">Four wheeler</option>
					<option value="other">Other</option>
				</select> */}
				{/* <Space vertical={25} /> */}

				<Input type="text" name="registration" placeholder="Vehicle RC Number" style={{width: '100%'}} onChange={updateRegistrationCb} />
				<Space vertical={30} />

				<Button variant="contained" color="primary" fullWidth={true} onClick={saveVehicle}>
					Save
				</Button>
			</div>
		</React.Fragment>
	);
};

export default AddVehiclePage;