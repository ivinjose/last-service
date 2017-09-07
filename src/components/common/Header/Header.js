import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import { browserHistory } from 'react-router'; 
import styles from './Header.css';
import routes from '../../../routes/routes';

import AppBar from 'material-ui/AppBar';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import RemoveRedEye from 'material-ui/svg-icons/image/remove-red-eye';
import PersonAdd from 'material-ui/svg-icons/social/person-add';

class Header extends React.Component {
	constructor() {
		super();
		this.state = {
			isDrawerOpen: false
		};
	}

	render() {
		return (
			<div className={styles['header']}>
				<AppBar
					title={this.props.title}
					onLeftIconButtonTouchTap={this.openDrawer.bind(this)} />

				<Drawer
					docked={false}
					width={200}
					open={this.state.isDrawerOpen}
					onRequestChange={(isDrawerOpen) => this.setState({isDrawerOpen})} >
						{
							routes.map( (route, index) => {
								return (
									<MenuItem key={index} onClick={this.changeRoute.bind(this, index)}>{route.name}</MenuItem>
								);
							})
						}
				</Drawer>
			</div>
		);
	}

	openDrawer(){
		this.setState({
			isDrawerOpen: true
		});
	}

	changeRoute(index){
		this.setState({
			isDrawerOpen: false
		},()=>{
			browserHistory.push( routes[index].path );
		});
	}
}

Header.contextTypes = {
	store: PropTypes.object
};

export default Header;