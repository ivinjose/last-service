import React from 'react';
import styles from  './Login.css';
import useStoreon from 'storeon/react'
import Header from '../common/Header';

const Login = () => {
    const { user, dispatch } = useStoreon('user');
    return(
        <div className={styles['login-page']}>
            <Header title={'View service details'} />
            <div className={styles["form"]}>
                <div className={styles['input-row']}>
                    <input type="text" name="username" placeholder="Username" />
                </div>
                <div className={styles['input-row']}>
                    <input type="password" name="password" placeholder="Password" />
                </div>
                <div className={styles['input-row']}>
                    <button type="button" onClick={ ()=> dispatch('user:loggedin') }>Login</button>
                </div>
            </div>
        </div>
    )
}

export default Login;