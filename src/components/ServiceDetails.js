import React from 'react';
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
				<select>
					<option value="volvo">Royal Enfield Electra</option>
					<option value="saab">Hyundai i20</option>
					<option value="mercedes">Hero Honda Splendor</option>
				</select> 
				<ServicedItem />
				<button onClick={this.saveServicedItem.bind(this)}>Save</button>
				{this.state && this.state.serviceDetails}
			</div>
		);
	}

	saveServicedItem(e){
		this.store.dispatch({ type: 'ADD', data: 'test' });
	}
}

export default ServiceDetails;