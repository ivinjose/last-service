import React from 'react';
import ReactDOM from 'react-dom';
import classNames from 'classnames';
import styles from './Header.css';
import globalStyles from '../../../styles/global.css';
import {getServiceDetailsOf} from '../../../actions/actionCreators';
import ServiceDetails from '../../ServiceDetails';

class ViewServiceDetails extends React.Component {
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
			<div className={styles['header']}>
				<nav className={styles['navbar']} role="navigation">
					<ul className={styles['nav']}>
						<li className={styles['active']}><a href="/">Add Service Details</a></li>
						<li><a href="/view">Show Service Details</a></li>
					</ul>
				</nav>
			</div>
		);
	}

	chooseVehicle(e){
		let target, value;
		target = e.target;
		value = target.value;
		if( value === '' ) return;
		this.getServiceDetailsOf(value);
	}

	getServiceDetailsOf(vehicle){
		let { store } = this.context;
		store.dispatch(getServiceDetailsOf(vehicle));
	}
}

ViewServiceDetails.contextTypes = {
	store: React.PropTypes.object
};

export default ViewServiceDetails;