import makeApiCall from "../utils/ApiHelper";

const services = store => {
    store.on('@init', ()=>({ services: [] }));

    store.on('services/get', async (state, vehicle)=>{
        store.dispatch('loading:true');
        const services = await makeApiCall("/api/vehicles/" + vehicle + "/services", { method: 'GET' });
        store.dispatch('services/get:success', services.data);
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
        const newServices = await makeApiCall("/api/vehicles/" + data.vehicleId + "/service", { method: 'POST', body: data.serviceDetails });
        store.dispatch('service/add:success', newServices.data);
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
};

export default services;