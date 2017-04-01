import { createStore, applyMiddleware } from 'redux'
import React from 'react';
import AddServiceDetails from '../AddServiceDetails';
import ShowServiceDetails from '../ShowServiceDetails';
import Counter from '../Counter';
// import createStore from '../../stores/createStore';
import serviceDetailsReducer from '../../reducers/serviceDetailsReducer';
import ReduxThunk from 'redux-thunk'
 
class Home extends React.Component {
	constructor() {
		super();
		this.store = createStore(serviceDetailsReducer, [ 'Use Redux' ], applyMiddleware(ReduxThunk));
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
				<AddServiceDetails store={this.store} />
				{this.state && this.state.serviceDetails &&
					<ShowServiceDetails data={this.state.serviceDetails.data} />
				}
			</div>
		);
	}
}

export default Home;