import React from 'react';
import ReactDOM from 'react-dom';
import styles from './Header.css';
import routes from '../../../routes/routes';
import {changeRoute} from '../../../actions/actionCreators';

class Header extends React.Component {
	constructor() {
		super();
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
			currentRoute: state.metaData.currentRoute
		});
	}

	render() {
		return (
			<div className={styles['header']}>
				<nav className={styles['navbar']} role="navigation">
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
				</nav>
			</div>
		);
	}

	changeRoute(e){
		e.preventDefault();
		let index = e.target.attributes.getNamedItem('data-index').value;
		const { store } = this.context;
		store.dispatch( changeRoute(index) );
	}
}

Header.contextTypes = {
	store: React.PropTypes.object
};

export default Header;