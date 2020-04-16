import createStore from 'storeon';
import { persistState } from '@storeon/localstorage'
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

const serviceableComponents = store => {
    store.on('@init', ()=>({ serviceableComponents: [
        { 'id': 'general', 'label': 'General Service' },
        { 'id': 'engine-oil', 'label': 'Engine oil' },
        { 'id': 'break-fluid', 'label': 'Break fluid' },
        { 'id': 'air-filter', 'label': 'Air filter' },
        { 'id': 'break-disc', 'label': 'Break disc' },
        { 'id': 'font-wiper-blade', 'label': 'Front wiper blade' },
        { 'id': 'rear-wiper-blade', 'label': 'Rear wiper blade' }
    ] }));
};

export const store = createStore([
    loading, 
    snackbarMessage,
    user,
    vehicles,
    services,
    serviceableComponents,
    persistState(['user', 'vehicles']),
    process.env.NODE_ENV !== 'production' && require('storeon/devtools')
]);