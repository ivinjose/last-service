import React, { useRef, useEffect } from 'react';
import styles from  './Signup.css';
import useStoreon from 'storeon/react'
import Header from '../common/Header';
import Strings from "../../constants/StringConstants";

const Signup = (props) => {
    const { user, dispatch } = useStoreon('user');
    const nameEl = useRef(null);
    const idEl = useRef(null);
    const passwordEl = useRef(null);
    const confirmPasswordEl = useRef(null);
    
    useEffect(()=>{
        if(user.isLoggedIn) {
            props.history.replace("/");
        }
    },[user])


    return(
        <div className={styles['signup-page']}>
            <Header title={Strings.PAGE_TITLES.SIGNUP} />
            <div className={styles["form"]}>
                <div className={styles['input-row']}>
                    <input ref={nameEl} type="text" name="name" placeholder="Your Name"/>
                </div>
                <div className={styles['input-row']}>
                    <input ref={idEl} type="text" name="id" placeholder="Email or Mobile number"/>
                </div>
                <div className={styles['input-row']}>
                    <input ref={passwordEl} className="input" type="password" name="password" placeholder="Password"/>
                </div>
                <div className={styles['input-row']}>
                    <input ref={confirmPasswordEl} type="password" name="confirm-password" placeholder="Confirm Password"/>
                </div>
                <div className={styles['input-row']}>
                    <button type="button" onClick={()=>doSignup(dispatch, nameEl, idEl, passwordEl, confirmPasswordEl)}>Create account</button>
                </div>
            </div>
        </div>
    )
};

const doSignup = (dispatch, nameEl, idEl, passwordEl, confirmPasswordEl) => {
    const password = passwordEl.current.value;
    const confirmPassword = confirmPasswordEl.current.value;

    if( password !== confirmPassword ){
        dispatch('snackbar:show', Strings.SNACKBAR_MESSAGES.PASSWORD_MATCH_ERROR);
        return;
    }

    const userDetails = {
        name: nameEl.current.value,
        id: idEl.current.value,
        password
    };

    dispatch('user/signup', userDetails);
};

export default Signup;