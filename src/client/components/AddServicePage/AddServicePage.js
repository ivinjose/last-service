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
import Button from '@material-ui/core/Button';
import Strings from '../../constants/StringConstants';
import { saveServiceAsync } from "../../state/services";
import ApiConstants from "../../constants/ApiConstants";
import useStoreon from 'storeon/react'
import { getVehicleFromLocation, mutateNewServiceForDisplay } from "./helpers";


const AddServicePage = (props) => {
	const { user, vehicles, serviceableComponents, dispatch } = useStoreon('user', 'vehicles', 'serviceableComponents');
	const [ vehicleId, setVehicleId ] = useState("");
	const [ date, setDate ] = useState("");
	const [ component, setComponent ] = useState("");
	const [ amount, setAmount ] = useState("");
	const [ comment, setComment ] = useState("");
	const [ newService, setNewService ] = useState(null);

	useEffect(() => {
		const vehicleFromLocation = getVehicleFromLocation(props.location);
		vehicleFromLocation && setVehicleId( vehicleFromLocation );
	},[]);

	const updateVehicleIdCb = event => setVehicleId(event.target.value);
	const updateDateCb = event => setDate(event.target.value);
	const updateComponentCb = event => setComponent(event.target.value); 
	const updateAmountCb = event => setAmount(event.target.value); 
	const updateCommentCb = event => setComment(event.target.value); 

	const clear = () => {
		setVehicleId("");
		setDate("");
		setComponent("");
		setAmount("");
		setComment("");
	}

	const saveService = () => {
		if( !(vehicleId && date && component && amount) ){
			dispatch('snackbar:show', Strings.SNACKBAR_MESSAGES.INVALID_DETAILS);
			return;
		}
		const service = { user: user._id, vehicle: vehicleId, date, component, amount, comment };

		saveServiceAsync( dispatch, service ).then(({status, data: newService})=>{
			if( status == ApiConstants.STATUS_SUCCESS ){
				// props.history.push(getRouteDetails(routeConstants.ADD_SERVICE_DETAILS).path);
				const mutatedNewService = mutateNewServiceForDisplay(newService, vehicles, serviceableComponents);
				clear()
				setNewService( mutatedNewService )
			}else{
				dispatch('snackbar:show', Strings.SNACKBAR_MESSAGES.SOMETHING_WENT_WROING);
			}
		});
	}

	return (
		<React.Fragment>
			<Header title={Strings.PAGE_TITLES.ADD_SERVICE} />

			<div className={styles['add-service-page']}>
				<FormControl className={styles['form-control']}>
					<InputLabel>Choose your vehicle</InputLabel>
					<Select
						value={vehicleId}
						onChange={updateVehicleIdCb}>
						{ vehicles.map(vehicle => <MenuItem key={vehicle._id} value={vehicle._id} >{vehicle.name}</MenuItem> ) }
					</Select>
				</FormControl>
				<Space vertical={25} />

				<TextField
					type="date"
					placeholder="On which date service happened?"
					onChange={updateDateCb}
					fullWidth={true}
					value={date} />
				<Space vertical={15} />

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