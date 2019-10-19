import React from 'react';
import styles from  './Login.css';

const Login = () => {
    return(
        <div className={styles['login-page']}>
            <div className={styles["form"]}>
                <div className={styles['input-row']}>
                    <input type="text" name="username" placeholder="Username" />
                </div>
                <div className={styles['input-row']}>
                    <input type="password" name="password" placeholder="Password" />
                </div>
                <div className={styles['input-row']}>
                    <button type="button">Login</button>
                </div>
            </div>
        </div>
    )
}

export default Login;