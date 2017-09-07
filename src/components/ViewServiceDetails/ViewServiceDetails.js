import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import styles from './ViewServiceDetails.css';
import globalStyles from '../../styles/global.css';
import {getServiceDetailsOf} from '../../actions/actionCreators';
import ServiceDetails from '../ServiceDetails';
import Header from '../common/Header';

import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';

class ViewServiceDetails extends React.Component {
	constructor() {
		super();
	}

	componentWillMount(){
		const { store } = this.context;
		store.subscribe( this.change.bind(this) );
	}	

	change(){
		const { store } = this.context;
		let state = store.getState();
		this.setState({
			serviceDetails: state.appData.serviceDetails
		},function(){
			console.log(this.state.serviceDetails);
		});
	}
 
	render() {
		return (
			<div className={styles['service-details']}>
				<Header title={'View service details'}/>
				<div className={styles['body']}>
					<div className={globalStyles['row']}>
						<SelectField hintText="Choose your vehicle" fullWidth={true} value={null} onChange={this.chooseVehicle.bind(this)}>
							<MenuItem value={"Royal Enfield Electra"} primaryText="Royal Enfield Electra" />
							<MenuItem value={"Hyundai i20"} primaryText="Hyundai i20" />
							<MenuItem value={"Hero Honda Splendor"} primaryText="Hero Honda Splendor" />
						</SelectField>
					</div>

					{this.state && this.state.serviceDetails &&
						<ServiceDetails data={this.state.serviceDetails} />
					}
				</div>
			</div>
		);
	}

	chooseVehicle(event, key, payload){
		this.getServiceDetailsOf(payload);
	}

	getServiceDetailsOf(vehicle){
		let { store } = this.context;
		store.dispatch(getServiceDetailsOf(vehicle));
	}
}

ViewServiceDetails.contextTypes = {
	store: PropTypes.object
};

export default ViewServiceDetails;