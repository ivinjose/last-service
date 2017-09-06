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
					<SelectField hintText="Choose your vehicle" value={this.state.vehicle} onChange={this.onVehicleUpdate.bind(this)}>
						<MenuItem value={"Royal Enfield Electra"} primaryText="Royal Enfield Electra" />
						<MenuItem value={"Hyundai i20"} primaryText="Hyundai i20" />
						<MenuItem value={"Hero Honda Splendor"} primaryText="Hero Honda Splendor" />
					</SelectField>
				</div>

				<div className={globalStyles['row']}>
					<DatePicker 
						hintText="On which date service happened?" 
						onUpdateInput={this.dateUpdate.bind(this)}
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
						/*onUpdateInput={this.serviceablePartUpdate.bind(this)}*//>
				</div>

				<div  className={globalStyles['row']}>
					<TextField hintText="Amount paid" /*onUpdateInput={this.commentsUpdate.bind(this)}*//>
				</div>

				<div  className={globalStyles['row']}>
					<TextField hintText="Any comments? (Optional)" /*onUpdateInput={this.commentsUpdate.bind(this)}*//>
				</div>

				<RaisedButton label="Save" primary={true} />

				{/* <div  className={globalStyles['row']}>
					<div className={globalStyles['label']}>Enter service details:</div>
					<div className={globalStyles['value']}>
						<ServicedItem ref="serviced-item" onSave={this.saveServicedItem.bind(this)}/>
					</div>
				</div> */}
				
			</div>
		);
	}

	saveServicedItem(e){
		let { store } = this.context;
		let vehicle = { vehicle: this.state.vehicle };
		let servicedItem = this.refs['serviced-item'].getValues() ;

		let data = Object.assign( {}, vehicle, servicedItem );
		store.dispatch(addServiceDetails(data));
	}

	onVehicleUpdate(event,key,payload){
		this.setState({
			vehicle: payload
		});
	}

	dateUpdate(event,key,payload){
		
	}

	serviceablePartUpdate(event,key,payload){
		this.setState({
			servicedPart: payload
		});
	}

	commentsUpdate(event,key,payload){

	}

	
}

AddServiceDetails.contextTypes = {
	store: React.PropTypes.object
};

export default AddServiceDetails;