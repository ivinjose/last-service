import createStore from 'storeon';

const user = store => {
    store.on('@init', ()=>({ user: {isLoggedIn: false} }));
    store.on('user:loggedin', ()=>{
        return{ user: { isLoggedIn: true } }
    });
}

const loading = store => {
    store.on('@init', ()=>({ loading: false }));
    store.on('loading:true', ()=>({ loading: true }));
    store.on('loading:false', ()=>({ loading: false }));
}

export const store = createStore([user, loading]);