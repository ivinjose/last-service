import React from 'react';
import AddServiceDetails from '../AddServiceDetails';
import ShowServiceDetails from '../ShowServiceDetails';
 
class Home extends React.Component {
	constructor() {
		super();
	}

	componentWillMount(){
		const { store } = this.props;
		store.subscribe( this.change.bind(this) );
	}

	change(){
		const { store } = this.props;
		this.setState({
			serviceDetails: store.getState()
		},function(){
			console.log(this.state.serviceDetails);	
		});
	}
 
	render() {
		const { store } = this.props;
		return (
			<div>
				<AddServiceDetails store={store} />
				{this.state && this.state.serviceDetails &&
					<ShowServiceDetails data={this.state.serviceDetails.data} />
				}
			</div>
		);
	}
}

export default Home;