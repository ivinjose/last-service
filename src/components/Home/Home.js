import React from 'react';
import AddServiceDetails from '../AddServiceDetails';
import ServiceDetails from '../ServiceDetails';
import PropTypes from 'prop-types';
 
class Home extends React.Component {
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
			<div>
				<AddServiceDetails />
				{this.state && this.state.serviceDetails &&
					<ServiceDetails data={this.state.serviceDetails} />
				}
			</div>
		);
	}
}

Home.contextTypes = {
	store: PropTypes.object
};

export default Home;