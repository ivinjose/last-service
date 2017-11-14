import React from 'react';
import PropTypes from 'prop-types';
import { browserHistory } from 'react-router'; 
import styles from './VehicleCard.css';

const colors = [ "#68A8F0", "#83C540", "#FEDC32", "#D34AA9", "#DFA142"  ];

class VehicleCard extends React.Component {
	constructor() {
		super();
	}
 
	render() {
		return(
			<div className={styles['vehicle-card']}>
				<div className={styles['vehicle-image']} style={{backgroundColor: colors[this.props.index%5]}}>

				</div>
				<div className={styles['vehicle-details']}>
					{this.props.data.name}
				</div>
			</div>
		);
	}
}

export default VehicleCard;