import React, { useState, useEffect } from 'react';
import useStoreon from 'storeon/react'
import Header from '../common/Header';
import Space from '../common/Stylers/Space';
import Input from "../common/Input";
import styles from './AddVehiclePage.css';
import Button from '@material-ui/core/Button';
import Strings from '../../constants/StringConstants';

const AddVehiclePage = (props) => {
	const { user, redirect, loading, dispatch } = useStoreon('user', 'redirect', 'loading');

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
		dispatch('vehicles/add', {userId: user._id, vehicles: [vehicle]})
	}

	useEffect(()=>{
		if( redirect && redirect.url ){
			//TODO:: Have a common technique for undoing all the UI store actions, from all pages
			dispatch('redirect:disabled');
			props.history.push(redirect.url);
		}
	},[redirect])
	
	return (
		<React.Fragment>
			<Header title={Strings.PAGE_TITLES.ADD_VEHICLE}/>

			<div className={styles['add-vehicle-page']}>
				<Input type="text" name="name" placeholder="Vehicle Name" style={{width: '100%'}} onChange={updateNameCb} />
				<Space vertical={25} />

				<select className={styles['vehicle-type']} name="vehicle-type" onChange={updateTypeCb}>
					<option value="">Type of vehicle?</option>
					<option value="two-wheeler">Two wheeler</option>
					<option value="four-wheeler">Four wheeler</option>
					<option value="other">Other</option>
				</select>
				<Space vertical={25} />

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