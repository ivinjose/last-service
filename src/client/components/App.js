import React from 'react';
import { 
	BrowserRouter as Router,
	Route,
} from 'react-router-dom';
import useStoreon from 'storeon/react'
import { routes } from "../routes/routes";
import Loader from './common/Loader';
import Snackbar from '@material-ui/core/Snackbar';
import SecureRoute from './common/SecureRoute';
import globalStyles from '../styles/global.css';

const App = () => { 
	const { loading, user, snackbarMessage, dispatch } = useStoreon('loading', 'user', 'snackbarMessage');
	return (
		<React.Fragment>
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
					autoHideDuration={2500}
					onClose={()=>dispatch('snackbar:hide')} />
		</React.Fragment>
	)
};

export default App;