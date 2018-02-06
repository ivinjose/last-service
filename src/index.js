import React from 'react';
import ReactDOM from 'react-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { Router, Route, browserHistory } from 'react-router';
import { Provider } from 'react-redux';
import store from './store';

import styles from './styles/global.css';
import Home from './components/Home';
import ViewServiceDetails from './components/ViewServiceDetails';
import AddServiceDetails from './components/AddServiceDetails';
import AddVehicleDetails from './components/AddVehicleDetails';
import ViewVehicleDetails from './components/ViewVehicleDetails';

const Root = () => (
    <Provider store={store}>
        <MuiThemeProvider>
            <Router history={browserHistory}>
                <Route path="/" component={Home} />
                <Route path="/addservice" component={AddServiceDetails} />
                <Route path="/view" component={ViewServiceDetails} />
                <Route path="/addvehicle" component={AddVehicleDetails} />
                <Route path="/viewvehicles" component={ViewVehicleDetails} />
            </Router>
        </MuiThemeProvider>
    </Provider>
);
 
document.addEventListener('DOMContentLoaded', function() {
	ReactDOM.render(
		<Root />,
		document.getElementById('mount')
	);
});

store.dispatch({type: 'INCREMENT_LIKES', index: "test"});