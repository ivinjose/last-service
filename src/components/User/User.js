import React from 'react';
import ReactDOM from 'react-dom';
import styles from './User.css';
import globalStyles from '../../styles/global.css';
import Header from '../common/Header';
import SubHeader from '../common/SubHeader';

class User extends React.Component {
	componentDidMount(){
		let queryParams = this.props.location.query;
		if( queryParams && queryParams.uid ){
			this.props.getUser(queryParams.uid);
		}
	}
 
	render() {
		return (
			<div className={styles['user']}>
				<SubHeader text={"USER"} />
				<div className={styles['body']}>
                        User info here
				</div>
			</div>
		);
	}
}

export default User;