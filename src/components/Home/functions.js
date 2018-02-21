// import { browserHistory } from 'react-router'; 
import { withRouter } from "react-router-dom";
import routes from '../../routes/routes';

export default{
    addNew(history){
		history.push( routes[3].path );
	},
}