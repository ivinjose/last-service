import React, { useRef, useEffect } from 'react';
import styles from  './Login.css';
import useStoreon from 'storeon/react'
import Header from '../common/Header';
import { Link } from 'react-router-dom';
import Strings from '../../constants/StringConstants';

const Login = (props) => {
    const { user, dispatch } = useStoreon('user');
    const usernameEl = useRef(null);
    const passwordEl = useRef(null);

    useEffect(()=>{
        if(user.isLoggedIn) {
            //TODO:: check why this is going into endless loops totally randomly
            setTimeout( ()=>{
                props.history.replace("/");
            }, 1);
        }
    },[user])

    return(
        <React.Fragment>
            <Header title={Strings.PAGE_TITLES.LOGIN} />
            <div className={styles["login-page"]}>
                <div className={styles['input-row']}>
                    <input ref={usernameEl} type="text" name="username" placeholder="Email or Mobile number" value="ivin" />
                </div>
                <div className={styles['input-row']}>
                    <input ref={passwordEl} type="password" name="password" placeholder="Password" value="ivin" />
                </div>
                <div className={styles['input-row']}>
                    <button type="button" onClick={()=>doLogin(dispatch, usernameEl, passwordEl)}>Login</button>
                </div>
                <br/>
                <div className={styles['input-row']}>
                    <div className={styles['signup-cue']}>New User? <Link to="/signup" className={styles['link']}> Join!</Link></div>
                </div>
            </div>
        </React.Fragment>
    )
}

const doLogin = (dispatch, usernameEl, passwordEl) => {
    const userCredentials = {
        username: usernameEl.current.value,
        password: passwordEl.current.value,
    };
    dispatch('user/login', userCredentials);

    // keeping for debugging purpose
    // setTimeout(()=>{
    //     dispatch('user/login:success',  { userId: '1', username: 'ivin'  } );
    //     dispatch('loading:false');
    // }, 200);
}

export default Login;