import React from 'react';

/**
 * A counter button: tap the button to increase the count.
 */
class Counter extends React.Component {
	constructor() {
		super();
	}
 
	render() {
		return (
			<div className="service-details">
				<select>
					<option value="volvo">Royal Enfield Electra</option>
					<option value="saab">Hyundai i20</option>
					<option value="mercedes">Hero Honda Splendor</option>
				</select> 
				<button onClick={this.saveServicedItem}>Save</button>
			</div>
		);
	}

	saveServicedItem(){

	}
}

export default Counter;



import createStore from '../stores/createStore';

const store = createStore();

const render = () => {
	document.body.innerText = store.getState();
};

store.subscribe( render );

window.onload = () => {
	render();
}

document.addEventListener('click', () => {
  store.dispatch({ type: 'INCREMENT' });
});