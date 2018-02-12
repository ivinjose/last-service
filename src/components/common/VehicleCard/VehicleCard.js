import React from 'react';
import PropTypes from 'prop-types';
import { browserHistory } from 'react-router'; 
import styles from './VehicleCard.css';

import IconButton from 'material-ui/IconButton';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import icon from '../../../images/ninja.jpg';

import iconBike from '../../../images/bike.jpg';
import iconCar from '../../../images/car.jpg';

const iconButtonElement = (
	<IconButton touch={true}>
	  <MoreVertIcon color={"#bbb"} />
	</IconButton>
);

class VehicleCard extends React.Component {
 
	render() {
		let iconImage = this.props.data.type == "Four wheeler"? iconCar : iconBike;
		return(
			<li className={styles['vehicle']} onClick={!this.props.showEdit?this.gotoVehicleDetails.bind(this):null}>
				<div className={styles['content']}>
					<div className={styles['text']}>
						{this.props.data.name}
					</div>
					<div className={styles['avatar']}>
						<img className={styles['image']} src={iconImage} />
					</div>
				</div>
				{this.props.showEdit &&
					<div className={styles['icon']}>
						<IconMenu iconButtonElement={iconButtonElement}>
							<MenuItem onClick={this.gotoEditVehiclePage.bind(this)}>Edit</MenuItem>
						</IconMenu>
					</div>
				}
			</li>
		);
	}

	gotoVehicleDetails(){
		browserHistory.push(  "/view?vehicle="+this.props.data.name );
	}

	gotoEditVehiclePage(){
		browserHistory.push( "/addvehicle?editMode=true&id="+this.props.data._id );
	}
}

export default VehicleCard;