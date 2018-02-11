import React from 'react';
import ReactDOM from 'react-dom';
import styles from './Login.css';
import globalStyles from '../../styles/global.css';

class Login extends React.Component {
 
	render() {
		return (
			<div className={styles['login']}>
				<button onClick={this.onClick.bind(this)}>Login</button>
			</div>
		);
	}

	onClick(){
		window.location.replace('http://localhost:4001/auth/google');
	}
}



export default Login;