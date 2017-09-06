import React from 'react';
import ReactDOM from 'react-dom';
import { browserHistory } from 'react-router'; 
import styles from './Header.css';
import routes from '../../../routes/routes';
import { changeRoute } from '../../../actions/actionCreators';

import AppBar from 'material-ui/AppBar';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';

class Header extends React.Component {
	constructor() {
		super();
		this.state = {
			isDrawerOpen: false
		};
	}

	componentWillMount(){
		const { store } = this.context;
		let state = store.getState();
		this.setState({
			currentRoute: state.metaData.currentRoute
		});
		store.subscribe( this.change.bind(this) );
	}
 
	change(){
		const { store } = this.context;
		let state = store.getState();
		this.setState({
			previousRoute: this.state.currentRoute,
			currentRoute: state.metaData.currentRoute
		}, ()=> {
			browserHistory.push( routes[this.state.currentRoute].path );
		});
	}

	render() {
		return (
			<div className={styles['header']}>
				<AppBar
					title={routes[this.state.currentRoute].name}
					onLeftIconButtonTouchTap={this.openDrawer.bind(this)}
					iconClassNameRight="muidocs-icon-navigation-expand-more" />

				<Drawer
					docked={false}
					width={200}
					open={this.state.isDrawerOpen}
					onRequestChange={(open) => this.setState({open})} >
						{
							routes.map( (route, index) => {
								return (
									<MenuItem onClick={this.changeRoute.bind(this, index)}>{route.name}</MenuItem>
								);
							})
						}
				</Drawer>

				{/* <nav className={styles['navbar']} role="navigation">
					<ul className={styles['nav']}>
						{
							routes.map( (route, index) => {
								return (
									<li key={index} className={index==this.state.currentRoute?styles['active']:null} >
										<a href={route.path} onClick={this.changeRoute.bind(this)} data-index={index}>{route.name}</a>
									</li>
								);
							})
						}
					</ul>
				</nav> */}
			</div>
		);
	}

	openDrawer(){
		this.setState({
			isDrawerOpen: true
		});
	}

	changeRoute(index){
		const { store } = this.context;
		store.dispatch( changeRoute(index) );
	}

	handleClose(){

	}
}

Header.contextTypes = {
	store: React.PropTypes.object
};

export default Header;