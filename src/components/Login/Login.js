import React, { useEffect, useRef } from 'react';
import fetch from 'isomorphic-fetch';
import styles from  './Login.css';
import useStoreon from 'storeon/react'
import Header from '../common/Header';

const Login = () => {
    const { user, dispatch } = useStoreon('user');
    const usernameEl = useRef(null);
    const passwordEl = useRef(null);
    
    useEffect(()=>{
        console.log('useEffect');
        console.log('user', user);
    });

    return(
        <div className={styles['login-page']}>
            <Header title={'View service details'} />
            <div className={styles["form"]}>
                <div className={styles['input-row']}>
                    <input ref={usernameEl} type="text" name="username" placeholder="Username" />
                </div>
                <div className={styles['input-row']}>
                    <input ref={passwordEl} type="password" name="password" placeholder="Password" />
                </div>
                <div className={styles['input-row']}>
                    <button type="button" onClick={onLogin.bind(null, dispatch, usernameEl, passwordEl)}>Login</button>
                </div>
            </div>
        </div>
    )
}

const onLogin = (dispatch, usernameEl, passwordEl) => {

    const data = {
        username: usernameEl.current.value,
        password: passwordEl.current.value,
    };

    fetch('http://localhost:4001/login',
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)

        }).then(function (response) {
            return (response.text());
        }).then(function (response) {
            return JSON.parse(response);
        }).then(function (response) {
            console.log({response});
            if( response.status === 'success' ){
                dispatch('user:loggedin:success', response.data );
            }else{
                dispatch('user:loggedin:fail', response.data );
            }
        }).catch(function (error) {
            console.log('Error in AddServiceDetails', error);
        });
}

export default Login;