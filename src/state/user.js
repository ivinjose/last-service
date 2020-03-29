import makeApiCall from "../utils/ApiHelper";

const user = store => {
    store.on('@init', ()=>({ user: {isLoggedIn: false} }));

    store.on('user/signup', async (state, userDetails)=>{
        store.dispatch('loading:true');
        const user = await makeApiCall("http://localhost:4001/signup", { method: 'POST', body: userDetails });
        if( user && user._id ){
            store.dispatch('user/signup:success', user);
        }else{
            store.dispatch('snackbar:show', "Invalid usernme or passowrd. Please try again.");
            store.dispatch('user/signup:error');
        }
    });

    store.on('user/login', async (state, userCredentials)=>{
        store.dispatch('loading:true');
        const user = await makeApiCall("http://localhost:4001/login", { method: 'POST', body: userCredentials });
        if( user && user._id ){
            store.dispatch('user/login:success', user);
        }else{
            store.dispatch('snackbar:show', "Invalid usernme or passowrd. Please try again.");
            store.dispatch('user/login:error');
        }
    });

    store.on('user/login:success', (state, data)=>{
        store.dispatch('loading:false');
        return { user: { isLoggedIn: true, ...data } };
    });
    
    store.on('user/login:error', ()=>{
        store.dispatch('loading:false');
        return{ user: {isLoggedIn: false} }
    });
};

export default user;