import React from 'react';
import ReactDOM from 'react-dom';
import classNames from 'classnames';
import createStore from '../../stores/createStore';
import ServicedItem from '../ServicedItem';
import serviceDetailsReducer from '../../reducers/serviceDetailsReducer';
import styles from './ServiceDetails.css';
import globalStyles from '../../styles/global.css';

/**
 * A counter button: tap the button to increase the count.
 */
class ServiceDetails extends React.Component {
	constructor() {
		super();
		this.store = createStore(serviceDetailsReducer);
	}

	componentWillMount(){
		this.store.subscribe( this.change.bind(this) );
	}

	change(){
		this.setState({
			serviceDetails: this.store.getState()
		});
	}
 
	render() {
		return (
			<div className={styles['service-details']}>
				<div  className={globalStyles['row']}>
					<div className={globalStyles['label']}>Choose your vehicle:</div>
					<div className={globalStyles['value']}>
						<select ref="vehicle" className={classNames(styles['vehicle-name'],globalStyles['drop-down'])}>
							<option value="electra">Royal Enfield Electra</option>
							<option value="i20">Hyundai i20</option>
							<option value="splendor">Hero Honda Splendor</option>
						</select> 
					</div>
				</div>
				<div  className={globalStyles['row']}>
					<div className={globalStyles['label']}>Enter service details:</div>
					<div className={globalStyles['value']}>
						<ServicedItem ref="serviced-item" onSave={this.saveServicedItem.bind(this)}/>
					</div>
				</div>
				{this.state && this.state.serviceDetails}
			</div>
		);
	}

	saveServicedItem(e){
		let vehicle = { vehicle: ReactDOM.findDOMNode( this.refs.vehicle ).value };
		let servicedItem = this.refs['serviced-item'].getValues() ;
		let data = JSON.stringify( Object.assign( {}, vehicle, servicedItem ) );

		this.store.dispatch({ type: 'ADD', data: data });
	}
}

export default ServiceDetails;