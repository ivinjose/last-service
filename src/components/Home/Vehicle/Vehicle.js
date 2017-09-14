import React from 'react';
import PropTypes from 'prop-types';
import { browserHistory } from 'react-router'; 
import styles from './Vehicle.css';

class Vehicle extends React.Component {
	constructor() {
		super();
	}
 
	render() {
		return(
			<div>{this.props.data.name}</div>
		);
	}
}

export default Vehicle;