import { useEffect } from 'react';
import useStoreon from 'storeon/react'

const Logout = () => {
    const { user, dispatch } = useStoreon('user');

    useEffect(()=>{
        if(user.isLoggedIn) {
            dispatch('user/logout');
        }
    },[])

    return null;
};

export default Logout;