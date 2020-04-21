import React, { useState, useEffect } from 'react';
import Styles from  './LoginPage.css';
import useStoreon from 'storeon/react'
import Header from '../common/Header';
import Space from '../common/Stylers/Space';
import Input from "../common/Input";
import { Link } from 'react-router-dom';
import Strings from '../../constants/StringConstants';
import sha256 from 'crypto-js/sha256';

const LoginPage = (props) => {
    const { user, dispatch } = useStoreon('user');
    const [id, setId] = useState();
    const [password, setPassword] = useState();

    const setIdCb = event => setId(event.target.value);
    const setPasswordCb = event => setPassword(event.target.value);
    const doLogin = () => dispatch('user/login', {id, password: sha256(password).toString() });

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
            <Header location={props.location} />
            <div className={Styles["login-page"]}>
                <Input type="text" name="id" placeholder="Email or Mobile number" onChange={setIdCb}/>
                <Space vertical={15} />

                <Input type="password" name="password" placeholder="Password" onChange={setPasswordCb}/>
                <Space vertical={15} />

                <button className={Styles['button']} type="button" onClick={doLogin}>{Strings.CTA_TEXT.LOGIN}</button>
                <Space vertical={25} />

                <div className={Styles['signup-cue']}>New User? <Link to="/signup" className={Styles['link']}>{Strings.CTA_TEXT.SIGNUP}</Link></div>
            </div>
        </React.Fragment>
    )
}

export default LoginPage;