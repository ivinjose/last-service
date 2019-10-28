import React from 'react';
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';
import { 
	BrowserRouter as Router,
	Route,
} from 'react-router-dom';
import useStoreon from 'storeon/react'
import { routes } from "../routes/routes";
import Loader from './common/Loader';
import SecureRoute from './common/SecureRoute';

const App = () => { 
	const { loading } = useStoreon('loading');
	const { user } = useStoreon('user');
	return (
		<MuiThemeProvider>
			<Loader loading={loading} />
			<Router>
				{
					routes.map((routeObj)=>{
						return routeObj.isSecure
						? <SecureRoute exact user={user} {...routeObj} />
						: <Route exact {...routeObj} />;
					})
				}
			</Router>
		</MuiThemeProvider>
	)
};

export default App;