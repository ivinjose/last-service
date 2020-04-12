import React, { useState } from 'react';
import useStoreon from 'storeon/react'
import Header from '../common/Header';
import Space from '../common/Stylers/Space';
import Input from "../common/Input";
import styles from './AddVehiclePage.css';
import Button from '@material-ui/core/Button';
import Strings from '../../constants/StringConstants';

const AddVehiclePage = () => {
	const { user, vehicles, loading, dispatch } = useStoreon('user', 'vehicles', 'loading');

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
	
	return (
		<React.Fragment>
			<Header title={Strings.PAGE_TITLES.ADD_VEHICLE}/>

			<div className={styles['add-vehicle-page']}>
				<Input type="text" name="name" placeholder="Vehicle Name" style={{width: '100%'}} onChange={updateNameCb} />
				<Space vertical={15} />

				<select name="Icecream Flavours" onChange={updateTypeCb}>
					<option value="">What type of vehicle?</option>
					<option value="two-wheeler">Two wheeler</option>
					<option value="four-wheeler">Four wheeler</option>
					<option value="other">Other</option>
				</select>
				<Space vertical={15} />

				<Input type="text" name="registration" placeholder="Vehicle RC Number" style={{width: '100%'}} onChange={updateRegistrationCb} />
				<Space vertical={25} />

				<Button variant="contained" color="primary" fullWidth={true} onClick={saveVehicle}>
					Save
				</Button>
			</div>
		</React.Fragment>
	);
};

export default AddVehiclePage;