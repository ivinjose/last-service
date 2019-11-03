import createStore from 'storeon';

const user = store => {
    store.on('@init', ()=>({ user: {isLoggedIn: false} }));
    store.on('user:loggedin:success', (state, data)=>{
        return { user: { isLoggedIn: true, ...data } };
    });
    store.on('user:loggedin:fail', ()=>({ user: {isLoggedIn: false} }));
}

const loading = store => {
    store.on('@init', ()=>({ loading: false }));
    store.on('loading:true', ()=>({ loading: true }));
    store.on('loading:false', ()=>({ loading: false }));
}

export const store = createStore([
    user, 
    loading, 
    process.env.NODE_ENV !== 'production' && require('storeon/devtools')
]);