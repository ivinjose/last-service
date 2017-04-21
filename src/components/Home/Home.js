import React from 'react';
import AddServiceDetails from '../AddServiceDetails';
import ServiceDetails from '../ServiceDetails';
 
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
		this.setState({
			serviceDetails: store.getState()
		},function(){
			console.log(this.state.serviceDetails);
		});
	}
 
	render() {
		return (
			<div>
				<AddServiceDetails />
				{this.state && this.state.serviceDetails &&
					<ServiceDetails data={this.state.serviceDetails.data} />
				}
			</div>
		);
	}
}

Home.contextTypes = {
	store: React.PropTypes.object
};

export default Home;