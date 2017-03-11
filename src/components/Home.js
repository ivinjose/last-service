import React from 'react';
import ServiceDetails from './ServiceDetails';
 
/**
 * A counter button: tap the button to increase the count.
 */
class Home extends React.Component {
	constructor() {
		super();
		this.state = {
			count: 0,
		};
	}
 
	render() {
		console.log(this);
		return (
			<ServiceDetails />
		);
	}
}

export default Home;