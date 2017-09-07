import React from 'react';
import ReactDOM from 'react-dom';
import { browserHistory } from 'react-router'; 
import styles from './Header.css';
import routes from '../../../routes/routes';
import { changeRoute } from '../../../actions/actionCreators';

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
									<MenuItem onClick={this.changeRoute.bind(this, index)}>{route.name}</MenuItem>
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
			const { store } = this.context;
			store.dispatch( changeRoute(index) );
		});
	}
}

Header.contextTypes = {
	store: React.PropTypes.object
};

export default Header;