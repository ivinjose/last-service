import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Header from '../common/Header';
import ServicedItem from './AddServicedItem';
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
import Snackbar from '@material-ui/core/Snackbar';
import fetch from 'isomorphic-fetch';

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
			snackbarState: false,
			snackbarMessage: " ",
			date: "",
			amount: "",
			comments: "",
		};
		this.closeSnackbar = this.closeSnackbar.bind(this);
	}

	componentDidMount() {
		this.getVehiclesList();
	}


	render() {
		return (
			<div className={styles['service-details']}>
				<Header title={"Add service details"} />

				<div className={styles['body']}>
					<div className={globalStyles['row']}>
						<FormControl className={styles['form-control']}>
							<InputLabel htmlFor="age-helper">Choose your vehicle</InputLabel>
							<Select
								value={this.state.currentVehicle}
								onChange={this.updateVehicle.bind(this)}>
								{
									this.state.vehicles.map(vehicle => {
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

				<Snackbar
					open={this.state.snackbarState}
					message={this.state.snackbarMessage}
					autoHideDuration={2000}
					onClose={this.closeSnackbar} />

			</div>
		);
	}

	getVehiclesList() {
		var _this = this;
		fetch('http://localhost:4001/users/5a86de0b90d792bccf3c3404/vehicles',
			{
				method: 'GET',
				headers: {
					'Content-Type': 'application/json'
				}

			}).then(function (response) {
				return (response.text());
			}).then(function (response) {
				return JSON.parse(response);
			}).then(function (response) {
				_this.setState({
					vehicles: response.data ? response.data : []
				});
			}).catch(function (error) {
				console.log('Error in AddServiceDetails', error);
			});
	}

	closeSnackbar() {
		this.setState({
			snackbarState: false
		});
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
		const name = this.state.vehicles.find((vehicle) => vehicle._id === id).name;
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
		const _this = this;

		fetch(`http://localhost:4001/vehicles/${id}/service`,
			{
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(data)

			}).then(function (response) {
				return (response.text());
			}).then(function (response) {
				return JSON.parse(response);
			}).then(function (response) {
				_this.setState({
					snackbarState: true,
					snackbarMessage: response.message,
					currentVehicle: null,
					date: "",
					comments: "",
					amount: "",
				});
			}).catch(function (error) {
				_this.setState({
					snackbarState: true,
					snackbarMessage: error,
					currentVehicle: null,
					date: "",
					comments: "",
					amount: "",
				});
			});

	}
}

AddServiceDetails.contextTypes = {
	store: PropTypes.object
};

export default AddServiceDetails;