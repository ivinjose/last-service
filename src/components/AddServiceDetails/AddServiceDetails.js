import React from 'react';
import ReactDOM from 'react-dom';
import classNames from 'classnames';
import ServicedItem from './AddServicedItem';
import styles from './AddServiceDetails.css';
import globalStyles from '../../styles/global.css';
import {addServiceDetails} from '../../actions/actionCreators';

import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import DatePicker from 'material-ui/DatePicker';
import AutoComplete from 'material-ui/AutoComplete';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';

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
			vehicle: null
		};
	}

	render() {
		return (
			<div className={styles['service-details']}>

				<div className={globalStyles['row']}>
					<SelectField hintText="Choose your vehicle" value={this.state.vehicle} onChange={this.updateVehicle.bind(this)}>
						<MenuItem value={"Royal Enfield Electra"} primaryText="Royal Enfield Electra" />
						<MenuItem value={"Hyundai i20"} primaryText="Hyundai i20" />
						<MenuItem value={"Hero Honda Splendor"} primaryText="Hero Honda Splendor" />
					</SelectField>
				</div>

				<div className={globalStyles['row']}>
					<DatePicker 
						hintText="On which date service happened?" 
						onChange={this.updateDate.bind(this)}
						formatDate={new DateTimeFormat('en-US', {
							day: 'numeric',
							month: 'long',
							year: 'numeric',
						}).format}/>
				</div>

				<div  className={globalStyles['row']}>
					<AutoComplete 
						hintText="Which part was serviced?" 
						dataSource={serviceableParts} 
						filter={AutoComplete.caseInsensitiveFilter} 
						onUpdateInput={this.updateServicedComponent.bind(this)}
						/>
				</div>

				<div  className={globalStyles['row']}>
					<TextField hintText="Amount paid" onChange={this.updateAmount.bind(this)} />
				</div>

				<div  className={globalStyles['row']}>
					<TextField hintText="Any comments? (Optional)" onChange={this.updateComments.bind(this)} />
				</div>

				<div  className={globalStyles['row']}>
					<RaisedButton label="Save" primary={true} onClick={this.saveServicedItem.bind(this)}/>
				</div>
				
			</div>
		);
	}

	updateVehicle(event, key, payload){
		this.setState({
			vehicle: payload
		});
	}

	updateDate(event, date){
		this.setState({
			date: date
		});
	}

	updateServicedComponent(searchText, dataSource, params){
		this.setState({
			component: searchText
		});
	}

	updateAmount(event, newValue){
		this.setState({
			amount: newValue
		});
	}

	updateComments(event, newValue){
		this.setState({
			comments: newValue
		});
	}

	saveServicedItem(e){
		let { store } = this.context;
		let vehicle = { vehicle: this.state.vehicle };
		let date = this.state.date;
		let component = this.state.component;
		let amount = this.state.amount;
		let comments = this.state.comments;

		let serviceDetails = { 
			date: date,
			component: component,
			amount: amount,
			comments: comments,
		};

		let data = Object.assign( {}, vehicle, serviceDetails );
		store.dispatch(addServiceDetails(data));
	}
}

AddServiceDetails.contextTypes = {
	store: React.PropTypes.object
};

export default AddServiceDetails;