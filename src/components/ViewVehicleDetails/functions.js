import { browserHistory } from 'react-router';
import routes from '../../routes/routes';

export default{
    addNew(){
		browserHistory.push( routes[1].path );
	},
}