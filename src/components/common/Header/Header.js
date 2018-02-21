import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
// import { browserHistory } from 'react-router'; 
import { withRouter } from "react-router-dom";
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
					onLeftIconButtonTouchTap={this.openDrawer.bind(this)}
					style={{backgroundColor: '#4E92DF', position: 'fixed'}}
					 />

				<Drawer
					docked={false}
					width={250}
					open={this.state.isDrawerOpen}
					value={1}
					onRequestChange={(isDrawerOpen) => this.setState({isDrawerOpen})} >
						<div className={styles['info-bar']}>
							<div className={styles['user-image-placeholder']}>
								<img src={this.props.user.photo} className={styles['image']} alt="User image" />
							</div>	
							<div className={styles['username']}>	
								{this.props.user.displayName}
							</div>	
							<div className={styles['email']}>
                                {this.props.user.email}
							</div>	
						</div>
						{
							routes.map( (route, index) => {
								return (
									<MenuItem style={{fontWeight: 400, color: '#333333'}} value={1} key={index} onClick={this.changeRoute.bind(this, index)}>{route.name}</MenuItem>
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
			this.props.history.push( routes[index].path );
		});
	}
}

Header.contextTypes = {
	store: PropTypes.object
};

export default withRouter(Header);