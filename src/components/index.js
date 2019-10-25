import React from 'react';
import ReactDOM from 'react-dom';
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';
import { 
	BrowserRouter as Router,
	Route,
	Redirect
} from 'react-router-dom';

import { routes } from "../routes/routes";
import useStoreon from 'storeon/react'
import StoreContext from 'storeon/react/context'
import { store } from '../state/store';

const SecureRoute = ({component: Component, ...rest}) =>{
	const { user, dispatch } = useStoreon('user');
	return <Route {...rest} render={(props)=> {
		if( user.isLoggedIn ){
			return <Component {...props} />;
		}else{
			return <Redirect to="/login" />;
		}
	}} />
};

const routeComponents = routes.map((routeObj, key)=>{
	return routeObj.isSecure
	? <SecureRoute exact path={routeObj.path} component={routeObj.component} key={key} />
	:<Route exact path={routeObj.path} component={routeObj.component} key={key} />;
});

const Root = () => (
	<React.Fragment>
		<MuiThemeProvider>
			<Router>
				{routeComponents}
			</Router>
		</MuiThemeProvider>
	</React.Fragment>
);

document.addEventListener('DOMContentLoaded', function() {
	ReactDOM.render(
		<StoreContext.Provider value={store}>
			<Root />
		</StoreContext.Provider>,
		document.getElementById('mount')
	);
});