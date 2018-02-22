import React from 'react';
import ReactDOM from 'react-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store, persistor } from './store';
import { PersistGate } from 'redux-persist/integration/react';

import App from './App';

/* 
 * Old logic used in react-router v3
 * *
const Root = () => (
    <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
            <MuiThemeProvider>
                <Router>
                    <Route path="/" component={App}>
                        <IndexRoute component={Home}></IndexRoute>
                        <Route path="/user" component={User} />
                        <Route path="/login" component={Login} />
                        <Route path="/login/success" component={Login} />
                        <Route path="/addservice" component={AddServiceDetails} />
                        <Route path="/view" component={ViewServiceDetails} />
                        <Route path="/addvehicle" component={AddVehicleDetails} />
                        <Route path="/viewvehicles" component={ViewVehicleDetails} />
                    </Route>
                </Router>
            </MuiThemeProvider>
        </PersistGate>
    </Provider>
);
*/

const Root = () => (
    <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
            <MuiThemeProvider>
                <Router>
                    <App />
                </Router>
            </MuiThemeProvider>
        </PersistGate>
    </Provider>
);
 
document.addEventListener('DOMContentLoaded', function() {
	ReactDOM.render(
		<Root />,
		document.getElementById('mount')
	);
});