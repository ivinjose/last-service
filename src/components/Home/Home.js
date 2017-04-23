import React from 'react';
import AddServiceDetails from '../AddServiceDetails';
import ServiceDetails from '../ServiceDetails';
import Header from '../common/Header';
 
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
				<Header />
				<AddServiceDetails />
				{this.state && this.state.serviceDetails &&
					<ServiceDetails data={this.state.serviceDetails} />
				}
			</div>
		);
	}
}

Home.contextTypes = {
	store: React.PropTypes.object
};

export default Home;