import { useEffect } from 'react';
import useStoreon from 'storeon/react'

const LogoutPage = () => {
    const { user, dispatch } = useStoreon('user');

    useEffect(()=>{
        if(user.isLoggedIn) {
            dispatch('user/logout');
        }
    },[])

    return null;
};

export default LogoutPage;