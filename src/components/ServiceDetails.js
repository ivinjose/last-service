import React from 'react';
import ReactDOM from 'react-dom';
import createStore from '../stores/createStore';
import ServicedItem from './ServicedItem';
import serviceDetailsReducer from '../reducers/serviceDetailsReducer';

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
			<div className="service-details">
				<div>Choose your vehicle:</div> 
				<select ref="vehicle">
					<option value="electra">Royal Enfield Electra</option>
					<option value="i20">Hyundai i20</option>
					<option value="splendor">Hero Honda Splendor</option>
				</select> 
				<ServicedItem ref="serviced-item"/>
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