import createStore from 'storeon';

const user = store => {
    store.on('@init', ()=>({ user: {isLoggedIn: false} }));
    store.on('user:loggedin:success', (state, data)=>{
        return { user: { isLoggedIn: true, ...data } };
    });
    store.on('user:loggedin:error', ()=>({ user: {isLoggedIn: false} }));
}

const loading = store => {
    store.on('@init', ()=>({ loading: false }));
    store.on('loading:true', ()=>({ loading: true }));
    store.on('loading:false', ()=>({ loading: false }));
}

const vehicles = store => {
    store.on('@init', ()=>({ vehicles: [] }));
    store.on('vehicles/get:success', (state, data)=>{
        return { vehicles: data };
    });
    store.on('vehicles/get:error', (state, error)=>{
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