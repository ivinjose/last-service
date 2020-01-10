import React from 'react';
import { ThemeProvider as MuiThemeProvider } from '@material-ui/core/styles';
import { 
	BrowserRouter as Router,
	Route,
} from 'react-router-dom';
import useStoreon from 'storeon/react'
import { routes } from "../routes/routes";
import Loader from './common/Loader';
import SecureRoute from './common/SecureRoute';

const App = () => { 
	const { loading, user } = useStoreon('loading', 'user');
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