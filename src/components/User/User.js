import React from 'react';
import ReactDOM from 'react-dom';
import queryString from 'query-string';
import styles from './User.css';
import globalStyles from '../../styles/global.css';
import Header from '../common/Header';
import SubHeader from '../common/SubHeader';

class User extends React.Component {
	componentDidMount(){
		let queryParams = queryString.parse( this.props.location.search );
		if( queryParams && queryParams.uid ){
			this.props.getUser(queryParams.uid);
		}
	}
 
	render() {
		return (
			<div className={styles['user']}>
				<SubHeader text={"USER"} />
				<div className={styles['body']}>
                        Hello there, {this.props.user.displayName}
				</div>
			</div>
		);
	}
}

export default User;