import React from 'react';
import ReactDOM from 'react-dom';
import createStore from '../../stores/createStore';
import ServicedItem from '../ServicedItem';
import serviceDetailsReducer from '../../reducers/serviceDetailsReducer';
import styles from './ServiceDetails.css';

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
				<div  className={styles['row']}>
					<span>Choose your vehicle:</span> 
					<select ref="vehicle" className={'input'}>
						<option value="electra">Royal Enfield Electra</option>
						<option value="i20">Hyundai i20</option>
						<option value="splendor">Hero Honda Splendor</option>
					</select> 
				</div>
				<div  className={styles['row']}>
					<ServicedItem ref="serviced-item"/>
				</div>
				<button onClick={this.saveServicedItem.bind(this)}>Save</button>
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