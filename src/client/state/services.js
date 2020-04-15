import makeApiCall from "../utils/ApiHelper";
import ApiConstants from "../constants/ApiConstants";

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

    // store.on('service/add', async (state, data)=>{
    //     store.dispatch('loading:true');
    //     const newServices = await makeApiCall("/api/vehicles/" + data.vehicleId + "/service", { method: 'POST', body: data.serviceDetails });
    //     store.dispatch('service/add:success', newServices.data);
    //     store.dispatch('snackbar:show', "Service added sucessfully");
    // });

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

export const saveServiceAsync = async (dispatch, data) => {
    dispatch('loading:true');
    const newService = await makeApiCall("/api/vehicles/" + data.vehicle + "/service", { method: 'POST', body: data });
    return new Promise(resolve => {
        if( newService.status == ApiConstants.STATUS_SUCCESS ){
            dispatch('vehicles/add:success', newService.data);
            resolve({ status: ApiConstants.STATUS_SUCCESS, data: newService, message: newServices.message });
        }else{
            dispatch('vehicles/add:error', newService.message);
            resolve({ status: ApiConstants.STATUS_ERROR, data: null, message: newService.message });
        }
    });
}

export default services;