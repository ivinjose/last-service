import React from 'react';
import PropTypes from 'prop-types';
import { browserHistory } from 'react-router'; 
import styles from './VehicleCard.css';

import {List, ListItem} from 'material-ui/List';
import Divider from 'material-ui/Divider';
import Subheader from 'material-ui/Subheader';
import Avatar from 'material-ui/Avatar';
import {grey400, darkBlack, lightBlack} from 'material-ui/styles/colors';
import IconButton from 'material-ui/IconButton';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';

import icon from '../../../images/ok-128.jpg';

const colors = [ "#68A8F0", "#83C540", "#FEDC32", "#D34AA9", "#DFA142"  ];

const iconButtonElement = (
	<IconButton touch={true}>
	  <MoreVertIcon color={grey400} />
	</IconButton>
);

const rightIconMenu = (
	<IconMenu iconButtonElement={iconButtonElement}>
	  <MenuItem>Edit</MenuItem>
	</IconMenu>
);

class VehicleCard extends React.Component {
	constructor() {
		super();
	}
 
	render() {
		var colorSelected = colors[this.props.index%5];
		return(
			<div className={styles['vehicle-card']} onClick={this.gotoVehicleDetails.bind(this)}>
				<ListItem
					leftAvatar={<Avatar src={icon} />}
					rightIconButton={this.props.showEdit?rightIconMenu:null}
					primaryText={this.props.data.name}
					secondaryText={
					<p>
						<span style={{color: darkBlack}}>Last serviced on {this.props.data.lastServiceDate}</span><br />
						<span style={{color: darkBlack}}>Last serviced amount is {this.props.data.lastServiceAmount}</span><br />
						<span style={{color: darkBlack}}>Vehicle type {this.props.data.type}</span><br/>
					</p>
					}
					secondaryTextLines={2} />
				<Divider inset={true} />
			</div>
		);
	}

	gotoVehicleDetails(){
		browserHistory.push(  "/view?vehicle="+this.props.data.name );
	}
}

export default VehicleCard;