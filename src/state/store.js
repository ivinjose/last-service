import createStore from 'storeon';
import makeApiCall from "../utils/ApiHelper";

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

    store.on('vehicles/add', async (state, data)=>{
        store.dispatch('loading:true');
        const newVehicles = await makeApiCall("http://localhost:4001/users/" + data.userId + "/vehicles", { method: 'POST', body: data.vehicles });
        store.dispatch('vehicles/add:success', newVehicles);
    });

    store.on('vehicles/add:success', (state, newVehicles)=>{
        store.dispatch('loading:false');
        return { vehicles: [ ...state.vehicles, ...newVehicles ] };
    });

    store.on('vehicles/add:error', (state, error)=>{
        store.dispatch('loading:false');
        console.log('Error in adding vehicles', error);
        return { vehicles: state.vehicles };
    });
}

const services = store => {
    store.on('@init', ()=>({ services: [] }));

    store.on('services/get', async (state, vehicle)=>{
        store.dispatch('loading:true');
        const services = await makeApiCall("http://localhost:4001/vehicles/" + vehicle + "/services", { method: 'GET' });
        store.dispatch('services/get:success', services);
    });

    store.on('services/get:success', (state, data)=>{
        store.dispatch('loading:false');
        return { services: data };
    });

    store.on('services/get:error', (state, error)=>{
        store.dispatch('loading:false');
        console.log('Error in fetching services', error);
        return { services: [] };
    });

    store.on('service/add', async (state, data)=>{
        store.dispatch('loading:true');
        const newServices = await makeApiCall("http://localhost:4001/vehicles/" + data.vehicleId + "/service", { method: 'POST', body: data.serviceDetails });
        store.dispatch('service/add:success', newServices);
        store.dispatch('snackbar:show', "Service added sucessfully");
    });

    store.on('service/add:success', (state, newServices)=>{
        store.dispatch('loading:false');
        return { services: [ ...state.services, ...newServices ] };
    });

    store.on('service/add:error', (state, error)=>{
        store.dispatch('loading:false');
        console.log('Error in adding service', error);
        return { services: state.services };
    });
}

export const store = createStore([
    user, 
    loading, 
    snackbarMessage,
    vehicles,
    services,
    process.env.NODE_ENV !== 'production' && require('storeon/devtools')
]);