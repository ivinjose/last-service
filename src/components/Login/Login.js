import React, { useRef } from 'react';
import fetch from 'isomorphic-fetch';
import styles from  './Login.css';
import useStoreon from 'storeon/react'
import Header from '../common/Header';
import Loader from '../common/Loader';

const Login = () => {
    const { dispatch: dispatchUser } = useStoreon('user');
    const { dispatch: dispatchLoading } = useStoreon('loading');
    const usernameEl = useRef(null);
    const passwordEl = useRef(null);

    return(
        <div className={styles['login-page']}>
            <Header title={'View service details'} />
            <div className={styles["form"]}>
                <div className={styles['input-row']}>
                    <input ref={usernameEl} type="text" name="username" placeholder="Username" value="ivin"/>
                </div>
                <div className={styles['input-row']}>
                    <input ref={passwordEl} type="password" name="password" placeholder="Password" value="ivin"/>
                </div>
                <div className={styles['input-row']}>
                    <button type="button" onClick={()=>onLogin(dispatchUser, usernameEl, passwordEl, dispatchLoading)}>Login</button>
                </div>
            </div>
        </div>
    )
}

const onLogin = (dispatchUser, usernameEl, passwordEl, dispatchLoading) => {

    const data = {
        username: usernameEl.current.value,
        password: passwordEl.current.value,
    };

    dispatchLoading('loading:true');

    // keeping for debugging purpose
    // setTimeout(()=>{
    //     dispatchUser('user:loggedin:success',  { userId: '1', username: 'ivin'  } );
    //     dispatchLoading('loading:false');
    // }, 200);

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
            dispatchLoading('loading:false');
            if( response.status === 'success' ){
                dispatchUser('user:loggedin:success', response.data );
            }else{
                dispatchUser('user:loggedin:fail', response.data );
            }
        }).catch(function (error) {
            console.log('Error in AddServiceDetails', error);
        });
}

export default Login;