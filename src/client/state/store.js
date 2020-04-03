import createStore from 'storeon';
import user from './user';
import vehicles from './vehicles';
import services from './services';

const loading = store => {
    store.on('@init', ()=>({ loading: false }));
    store.on('loading:true', ()=>({ loading: true }));
    store.on('loading:false', ()=>({ loading: false }));
}

const snackbarMessage = store => {
    store.on('@init', ()=>({ snackbarMessage: {show: false, message: null} }));
    store.on('snackbar:show', (state, message)=>{
        return { snackbarMessage: {show: true, message} }
    });
    store.on('snackbar:hide', ()=>({ snackbarMessage: {show: false, message: null} }));
}

export const store = createStore([
    user, 
    loading, 
    snackbarMessage,
    vehicles,
    services,
    process.env.NODE_ENV !== 'production' && require('storeon/devtools')
]);