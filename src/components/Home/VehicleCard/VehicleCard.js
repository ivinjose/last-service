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
		var colorSelected = colors[this.props.index%5];
		return(
			<div className={styles['vehicle-card']} onClick={this.gotoVehicleDetails.bind(this)}>
				<div className={styles['vehicle-image']} style={{backgroundColor: colorSelected}}>

				</div>
				<div className={styles['vehicle-details']} style={{borderColor: colorSelected}}>
					<div className={styles['vehicle-name']}>
						{this.props.data.name}
					</div>
					<div className={styles['vehicle-type']}>
						{this.props.data.type}
					</div>
					<div className={styles['vehicle-last-service-date']}>
						{this.props.data.lastServiceDate}
					</div>
					<div className={styles['vehicle-last-service-amount']}>
						{this.props.data.lastServiceAmount}
					</div>
				</div>
			</div>
		);
	}

	gotoVehicleDetails(){
		browserHistory.push(  "/view?vehicle="+this.props.data.name );
	}
}

export default VehicleCard;