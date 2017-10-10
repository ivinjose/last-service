import React from 'react';
import ReactDOM from 'react-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { Router, Route, browserHistory } from 'react-router';
import styles from '../styles/global.css';
import Home from './Home';
import ViewServiceDetails from './ViewServiceDetails';
import AddServiceDetails from './AddServiceDetails';
import AddVehicleDetails from './AddVehicleDetails';

const Root = () => (
	<MuiThemeProvider>
		<Router history={browserHistory}>
			<Route path="/" component={Home} />
			<Route path="/addservice" component={AddServiceDetails} />
			<Route path="/view" component={ViewServiceDetails} />
			<Route path="/addvehicle" component={AddVehicleDetails} />
		</Router>
	</MuiThemeProvider>
);
 
document.addEventListener('DOMContentLoaded', function() {
	ReactDOM.render(
		<Root />,
		document.getElementById('mount')
	);
});