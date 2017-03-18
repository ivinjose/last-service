import React from 'react';
import ServiceDetails from '../ServiceDetails';
import Counter from '../Counter';
import createStore from '../../stores/createStore';
import serviceDetailsReducer from '../../reducers/serviceDetailsReducer';
 
class Home extends React.Component {
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
		},function(){
			console.log(this.state.serviceDetails);	
		});
		
	}
 
	render() {
		return (
			<div>
				<ServiceDetails store={this.store} />
			</div>
		);
	}
}

export default Home;