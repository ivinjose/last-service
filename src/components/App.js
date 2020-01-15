import React from 'react';
import { ThemeProvider as MuiThemeProvider } from '@material-ui/core/styles';
import { 
	BrowserRouter as Router,
	Route,
} from 'react-router-dom';
import useStoreon from 'storeon/react'
import { routes } from "../routes/routes";
import Loader from './common/Loader';
import Snackbar from '@material-ui/core/Snackbar';
import SecureRoute from './common/SecureRoute';

const App = () => { 
	const { loading, user, snackbarMessage, dispatch } = useStoreon('loading', 'user', 'snackbarMessage');
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
			<Snackbar
					open={snackbarMessage.show}
					message={snackbarMessage.message}
					autoHideDuration={1000}
					onClose={()=>dispatch('snackbar:hide')} />
		</MuiThemeProvider>
	)
};

export default App;