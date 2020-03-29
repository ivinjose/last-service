import makeApiCall from "../utils/ApiHelper";
import Strings from "../constants/strings";

const user = store => {
    store.on('@init', ()=>({ user: {isLoggedIn: false} }));

    /* Signup flow */
    store.on('user/signup', async (state, userDetails)=>{
        store.dispatch('loading:true');
        const user = await makeApiCall("http://localhost:4001/signup", { method: 'POST', body: userDetails });
        if( user && user._id ){
            store.dispatch('user/signup:success', user);
        }else{
            store.dispatch('user/signup:error');
        }
    });

    store.on('user/signup:success', (state, data)=>{
        store.dispatch('loading:false');
        store.dispatch('snackbar:show', Strings.SIGNUP_SUCCESS);
        return { user: { isLoggedIn: true, ...data } };
    });
    
    store.on('user/signup:error', ()=>{
        store.dispatch('loading:false');
        store.dispatch('snackbar:show', Strings.SIGNUP_ERROR);
        return{ user: {isLoggedIn: false} }
    });


    /* Login flow */
    store.on('user/login', async (state, userCredentials)=>{
        store.dispatch('loading:true');
        const user = await makeApiCall("http://localhost:4001/login", { method: 'POST', body: userCredentials });
        if( user && user._id ){
            store.dispatch('user/login:success', user);
        }else{
            store.dispatch('user/login:error');
        }
    });

    store.on('user/login:success', (state, data)=>{
        store.dispatch('loading:false');
        store.dispatch('snackbar:show', Strings.LOGIN_SUCCESS);
        return { user: { isLoggedIn: true, ...data } };
    });
    
    store.on('user/login:error', ()=>{
        store.dispatch('loading:false');
        store.dispatch('snackbar:show', Strings.LOGIN_ERROR);
        return{ user: {isLoggedIn: false} }
    });
};

export default user;