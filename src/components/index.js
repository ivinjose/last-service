import React from 'react';
import ReactDOM from 'react-dom';
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';
import { Router, Route, browserHistory } from 'react-router';
// import styles from '../styles/global.css';
import { routes, getRouteDetails } from "../routes/routes";
import Home from './Home';

const routeComponents = routes.map((routeObj, key)=>{
	return <Route path={routeObj.path} component={routeObj.component} key={key} />;
});

const Root = () => (
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
);

document.addEventListener('DOMContentLoaded', function() {
	ReactDOM.render(
		<Root />,
		document.getElementById('mount')
	);
});