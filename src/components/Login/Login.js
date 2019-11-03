import React, { useRef, useEffect } from 'react';
import fetch from 'isomorphic-fetch';
import styles from  './Login.css';
import useStoreon from 'storeon/react'
import Header from '../common/Header';

const Login = (props) => {
    const { user, dispatch } = useStoreon('user');
    const usernameEl = useRef(null);
    const passwordEl = useRef(null);

    useEffect(()=>{
        if(user.isLoggedIn) {
            props.history.replace("/");
        }
    },[user])

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
                    <button type="button" onClick={()=>doLogin(dispatch, usernameEl, passwordEl)}>Login</button>
                </div>
            </div>
        </div>
    )
}

const doLogin = (dispatch, usernameEl, passwordEl) => {

    const data = {
        username: usernameEl.current.value,
        password: passwordEl.current.value,
    };

    dispatch('loading:true');

    // keeping for debugging purpose
    // setTimeout(()=>{
    //     dispatch('user:loggedin:success',  { userId: '1', username: 'ivin'  } );
    //     dispatch('loading:false');
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
            dispatch('loading:false');
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