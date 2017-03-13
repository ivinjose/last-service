import React from 'react';
import ServiceDetails from './ServiceDetails';
import Counter from './Counter';
 
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
			<div>
				<Counter />
				<ServiceDetails />
			</div>
		);
	}
}

export default Home;