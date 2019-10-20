import createStore from 'storeon';

const user = store => {
    store.on('@init', ()=>({ user: {isLoggedIn: true} }));
    store.on('user:loggedin', ({user})=>({ user: { isLoggedIn: true, userId: user.userId} }));
}

const loading = store => {
    store.on('@init', ()=>({ loading: false }));
    store.on('loading:true', ()=>({ loading: true }));
    store.on('loading:false', ()=>({ loading: false }));
}

export const store = createStore([user, loading]);