import React from 'react';
import ReactDOM from 'react-dom';
import styles from './Header.css';
import routes from '../../../routes/routes';

class Header extends React.Component {
	constructor() {
		super();
	}

	componentWillMount(){
		const { store } = this.context;
		let state = store.getState();
		this.currentRoute = state.metaData.currentRoute;
	}
 
	render() {
		return (
			<div className={styles['header']}>
				<nav className={styles['navbar']} role="navigation">
					<ul className={styles['nav']}>
						{
							routes.map( (route, index) => {
								if( index == this.currentRoute ){
									return <li key={index} className={styles['active']}><a href={route.path}>{route.name}</a></li>
								}
								else {
									return <li key={index}><a href={route.path}>{route.name}</a></li>
								}
							})
						}
					</ul>
				</nav>
			</div>
		);
	}
}

Header.contextTypes = {
	store: React.PropTypes.object
};

export default Header;