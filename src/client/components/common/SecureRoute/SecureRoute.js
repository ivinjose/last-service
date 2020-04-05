import React from 'react';
import {
	Route,
	Redirect
} from 'react-router-dom';

const SecureRoute = ({user, component: Component, ...rest}) =>{
	return <Route {...rest} render={(props)=> {
		if( user.isLoggedIn ){
			return <Component {...props} />;
		}else{
			return <Redirect to="/login" />;
		}
	}} />
};

export default SecureRoute;