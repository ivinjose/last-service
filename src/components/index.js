import React from 'react';
import ReactDOM from 'react-dom';
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';
import { Router, Route, browserHistory } from 'react-router';
import styles from '../styles/global.css';
import { routes } from "../routes/routes";
import useStoreon from 'storeon/react'
import StoreContext from 'storeon/react/context'
import { store } from '../state/store';

const routeComponents = routes.map((routeObj, key)=>{
	return <Route path={routeObj.path} component={routeObj.component} key={key} />;
});

const Root = () => (
	<React.Fragment>
		<Loader />
		<MuiThemeProvider>
			<Router history={browserHistory}>
				{routeComponents}
				{/* 
				TODO:: Figure out why this doesnt work
				{routes.map((routeObj)=>{
					return <Route path={routeObj.path} component={routeObj.component}/>;
				})}; 
				*/}
			</Router>
		</MuiThemeProvider>
	</React.Fragment>
);

const Loader = () =>{
	const { loading, dispatch } = useStoreon('loading');
	if( !loading ) return false;

	return(
		<div className={styles['overlay']}>
			<div className={styles['loader']}></div>
		</div>
	);
}

document.addEventListener('DOMContentLoaded', function() {
	ReactDOM.render(
		<StoreContext.Provider value={store}>
			<Root />
		</StoreContext.Provider>,
		document.getElementById('mount')
	);
});