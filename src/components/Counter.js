import React from 'react';
import createStore from '../stores/createStore';
import counter from '../reducers/reducer';

/**
 * A counter button: tap the button to increase the count.
 */
class Counter extends React.Component {
	constructor() {
		super();
		this.state = { 
			counterValue: 0
		};
		this.store = createStore(counter);
	}

	componentWillMount(){
		this.store.subscribe( this.change.bind(this) );
	}

	change(){
		this.setState({
			counterValue: this.store.getState()
		});
	}

	render() {
		return (
			<div className="service-details">
				{this.state.counterValue}
				<button onClick={this.incrementCounter.bind(this)}>Save</button>
			</div>
		);
	}

	incrementCounter(){
		this.store.dispatch({ type: 'INCREMENT' });
	}
}

export default Counter;