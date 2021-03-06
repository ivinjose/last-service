import makeApiCall from "../utils/ApiHelper";
import Strings from "../constants/StringConstants";
import ApiConstants from "../constants/ApiConstants";

const user = store => {
    store.on('@init', ()=>({ user: {isLoggedIn: false} }));

    store.on('user/clear', ()=>({ user: {isLoggedIn: false} }));

    /* Signup flow */
    store.on('user/signup', async (state, userDetails)=>{
        store.dispatch('loading:true');
        const result = await makeApiCall("/api/signup", { method: 'POST', body: {userDetails} });
        
        if( result.status === ApiConstants.STATUS_SUCCESS ){
            store.dispatch('user/signup:success', result.data);
        }else{
            store.dispatch('user/signup:error');
        }
    });

    store.on('user/signup:success', (state, data)=>{
        store.dispatch('loading:false');
        store.dispatch('snackbar:show', Strings.SNACKBAR_MESSAGES.SIGNUP_SUCCESS);
        return { user: { isLoggedIn: false, redirectToLogin: true } };
    });
    
    store.on('user/signup:error', ()=>{
        store.dispatch('loading:false');
        store.dispatch('snackbar:show', Strings.SNACKBAR_MESSAGES.SIGNUP_ERROR);
        return { user: {isLoggedIn: false} }
    });


    /* Login flow */
    store.on('user/login', async (state, userCredentials)=>{
        store.dispatch('loading:true');
        const result = await makeApiCall("/api/login", { method: 'POST', body: userCredentials });
        if( result.status === ApiConstants.STATUS_SUCCESS ){
            store.dispatch('user/login:success', result.data);
        }else{
            store.dispatch('user/login:error');
        }
    });

    store.on('user/login:success', (state, data)=>{
        store.dispatch('loading:false');
        store.dispatch('snackbar:show', Strings.SNACKBAR_MESSAGES.LOGIN_SUCCESS);
        return { user: { isLoggedIn: true, ...data } };
    });
    
    store.on('user/login:error', ()=>{
        store.dispatch('loading:false');
        store.dispatch('snackbar:show', Strings.SNACKBAR_MESSAGES.LOGIN_ERROR);
        return { user: {isLoggedIn: false} }
    });

    /* Logout flow */
    store.on('user/logout', (state)=>{
        store.dispatch('snackbar:show', Strings.SNACKBAR_MESSAGES.LOGOUT_SUCCESS);
        return { user: {isLoggedIn: false} };
    });
};

export default user;