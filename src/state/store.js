import createStore from 'storeon';
import makeApiCall from "../utils/ApiHelper";

const loading = store => {
    store.on('@init', ()=>({ loading: false }));
    store.on('loading:true', ()=>({ loading: true }));
    store.on('loading:false', ()=>({ loading: false }));
}

const user = store => {
    store.on('@init', ()=>({ user: {isLoggedIn: false} }));

    store.on('user/login', async (state, userCredentials)=>{
        store.dispatch('loading:true');
        const user = await makeApiCall("http://localhost:4001/login", { method: 'POST', body: userCredentials });
        store.dispatch('user/login:success', user);
    });

    store.on('user/login:success', (state, data)=>{
        store.dispatch('loading:false');
        return { user: { isLoggedIn: true, ...data } };
    });
    
    store.on('user/login:error', ()=>{
        store.dispatch('loading:false');
        return{ user: {isLoggedIn: false} }
    });
}

const vehicles = store => {
    store.on('@init', ()=>({ vehicles: [] }));

    store.on('vehicles/get', async (state, userId)=>{
        store.dispatch('loading:true');
        const vehicles = await makeApiCall("http://localhost:4001/users/" + userId + "/vehicles", { method: 'GET' });
        store.dispatch('vehicles/get:success', vehicles);
    });

    store.on('vehicles/get:success', (state, data)=>{
        store.dispatch('loading:false');
        return { vehicles: data };
    });

    store.on('vehicles/get:error', (state, error)=>{
        store.dispatch('loading:false');
        console.log('Error in fetching vehicles', error);
        return { vehicles: [] };
    });
}

export const store = createStore([
    user, 
    loading, 
    vehicles,
    process.env.NODE_ENV !== 'production' && require('storeon/devtools')
]);