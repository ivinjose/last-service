import React, { useState, useEffect } from 'react';
import styles from  './Signup.css';
import useStoreon from 'storeon/react'
import Header from '../common/Header';
import Space from '../common/Stylers/Space';
import Input from "../common/Input";
import Strings from "../../constants/StringConstants";

const Signup = (props) => {
    const { user, dispatch } = useStoreon('user');

    const [ name, setName ] = useState();
    const [ id, setId ] = useState();
    const [ password, setPassword ] = useState();
    const [ confirmPassword, setConfirmPassword ] = useState();

    const setNameCb = event => setName(event.target.value);
    const setIdCb = event => setId(event.target.value);
    const setPasswordCb = event => setPassword(event.target.value);
    const setConfirmPasswordCb = event => setConfirmPassword(event.target.value);

    const doSignup = () => {    
        if( !(name && id && password && confirmPassword) ){
            dispatch('snackbar:show', Strings.SNACKBAR_MESSAGES.INVALID_DETAILS);
            return;
        }
        if( password !== confirmPassword ){
            dispatch('snackbar:show', Strings.SNACKBAR_MESSAGES.PASSWORD_MATCH_ERROR);
            return;
        }
        dispatch('user/signup', { name, id, password });
    };
    
    useEffect(()=>{
        if(user.isLoggedIn) {
            props.history.replace("/");
        }
        if(user.redirectToLogin){
            props.history.replace("/login");
        }
    },[user])

    return(
        <React.Fragment>
            <Header title={Strings.PAGE_TITLES.SIGNUP} />
            <div className={styles["signup-page"]}>
                <Input type="text" name="name" placeholder="Your Name" onChange={setNameCb} />
                <Space vertical={15} />
                
                <Input type="text" name="id" placeholder="Email or Mobile number" onChange={setIdCb} />
                <Space vertical={15} />

                <Input type="password" name="password" placeholder="Password" onChange={setPasswordCb} />
                <Space vertical={15} />
                
                <Input type="password" name="confirm-password" placeholder="Confirm Password" onChange={setConfirmPasswordCb} />
                <Space vertical={25} />

                <button type="button" className={styles['button']} onClick={doSignup}>Create account</button>
            </div>
        </React.Fragment>
    )
};

export default Signup;