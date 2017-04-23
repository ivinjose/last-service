import React from 'react';
import ReactDOM from 'react-dom';
import classNames from 'classnames';
import styles from './ViewServiceDetails.css';
import globalStyles from '../../styles/global.css';
import {getServiceDetailsOf} from '../../actions/actionCreators';
import ServiceDetails from '../ServiceDetails';

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
		this.setState({
			serviceDetails: store.getState()
		},function(){
			console.log(this.state.serviceDetails);
		});
	}
 
	render() {
		return (
			<div className={styles['service-details']}>
				<div className={globalStyles['row']}>
					<div className={globalStyles['label']}>Choose your vehicle:</div>
					<div className={globalStyles['value']}>
						<select ref="vehicle" onChange={this.chooseVehicle.bind(this)} className={classNames(styles['vehicle-name'],globalStyles['drop-down'])}>
							<option value=""></option>
							<option value="Royal Enfield Electra">Royal Enfield Electra</option>
							<option value="Hyundai i20">Hyundai i20</option>
							<option value="Hero Honda Splendor">Hero Honda Splendor</option>
						</select> 
					</div>
				</div>

				{this.state && this.state.serviceDetails &&
					<ServiceDetails data={this.state.serviceDetails.data} />
				}
				
			</div>
		);
	}

	chooseVehicle(e){
		let target, value;
		target = e.target;
		value = target.value;
		if( value === '' ) return;
		this.getServiceDetailsOf(value);
	}

	getServiceDetailsOf(vehicle){
		let { store } = this.context;
		store.dispatch(getServiceDetailsOf(vehicle));
	}
}

ViewServiceDetails.contextTypes = {
	store: React.PropTypes.object
};

export default ViewServiceDetails;