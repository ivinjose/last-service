import React from 'react';
import PropTypes from 'prop-types';
import Header from '../common/Header';
import styles from './AddServiceDetails.css';
import globalStyles from '../../styles/global.css';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
// import DatePicker from '@material-ui/core/DatePicker';
// import AutoComplete from '@material-ui/core/AutoComplete';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import connect from 'storeon/react/connect'
import Strings from '../../constants/StringConstants';

let DateTimeFormat = global.Intl.DateTimeFormat; //IntlPolyfill.DateTimeFormat;

const serviceableParts = [
	'Engine oil',
	'Break fluid',
	'Air filter',
	'Break disc',
	'Front wiper blade',
	'Read wiper blade',
];

class AddServiceDetails extends React.Component {
	constructor() {
		super();

		this.state = {
			vehicles: [],
			currentVehicle: null,
			date: "",
			amount: "",
			comments: "",
		};
	}

	render() {
		return (
			<div className={styles['service-details']}>
				<Header title={Strings.PAGE_TITLES.ADD_SERVICE} />

				<div className={styles['body']}>
					<div className={globalStyles['row']}>
						<FormControl className={styles['form-control']}>
							<InputLabel htmlFor="age-helper">Choose your vehicle</InputLabel>
							<Select
								value={this.state.currentVehicle}
								onChange={this.updateVehicle.bind(this)}>
								{
									this.props.vehicles.map(vehicle => {
										return (
											<MenuItem key={vehicle._id} value={vehicle._id} >{vehicle.name}</MenuItem>
										);
									})

								}
							</Select>
						</FormControl>
					</div>

					<div className={globalStyles['row']}>
						<TextField
							type="date"
							placeholder="On which date service happened?"
							onChange={this.updateDate.bind(this)}
							fullWidth={true}
							value={this.state.date} />
					</div>

					<div className={globalStyles['row']}>
						{/* <AutoComplete 
							hintText="Which part was serviced?" 
							dataSource={serviceableParts} 
							fullWidth={true}
							filter={AutoComplete.caseInsensitiveFilter} 
							onUpdateInput={this.updateServicedComponent.bind(this)}
							/> */}
					</div>

					<div className={globalStyles['row']}>
						<TextField
							placeholder="How much you paid?"
							fullWidth={true}
							onChange={this.updateAmount.bind(this)}
							value={this.state.amount} />
					</div>

					<div className={globalStyles['row']}>
						<TextField
							placeholder="Any comments? (Optional)"
							fullWidth={true}
							onChange={this.updateComments.bind(this)}
							value={this.state.comments} />
					</div>

					<div className={globalStyles['row']}>
						<Button variant="contained" color="primary" fullWidth={true} onClick={this.saveServicedItem.bind(this)}>Save</Button>
					</div>
				</div>

			</div>
		);
	}

	updateVehicle(event) {
		this.setState({
			currentVehicle: event.target.value
		});
	}

	updateDate(event) {
		this.setState({
			date: event.target.value
		});
	}

	updateServicedComponent(searchText, dataSource, params) {
		this.setState({
			component: searchText
		});
	}

	updateAmount(event) {
		this.setState({
			amount: event.target.value
		});
	}

	updateComments(event) {
		this.setState({
			comments: event.target.value
		});
	}

	saveServicedItem(e) {
		const id = this.state.currentVehicle;
		const name = this.props.vehicles.find((vehicle) => vehicle._id === id).name;
		const vehicleDetails = { vehicle: id, name };
		const date = this.state.date;
		//let component = this.state.component;
		const amount = this.state.amount;
		const comments = this.state.comments;

		const serviceDetails = {
			date: date,
			//component: component,
			amount: amount,
			comments: comments,
		};
		const data = { ...vehicleDetails, ...serviceDetails };
		this.props.dispatch('service/add', {vehicleId: id, serviceDetails: data})
	}
}

AddServiceDetails.contextTypes = {
	store: PropTypes.object
};

export default connect('user', 'vehicles', 'snackbarMessage', AddServiceDetails);