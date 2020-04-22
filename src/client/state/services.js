import makeApiCall from "../utils/ApiHelper";
import ApiConstants from "../constants/ApiConstants";

const services = store => {
    store.on('@init', ()=>({ services: [] }));

    store.on('services/clear', ()=>({ services: [] }));

    store.on('services/get', async (state, vehicle)=>{
        store.dispatch('loading:true');
        const services = await makeApiCall("/api/vehicles/" + vehicle + "/services", { method: 'GET' });

        if( services.status === ApiConstants.STATUS_SUCCESS ){
            store.dispatch('services/get:success', services.data);
        }else if( services.status === ApiConstants.UNAUTHORIZED ){
            store.dispatch('services/get:error');
            store.dispatch('snackbar:show', Strings.SNACKBAR_MESSAGES.COOKIE_NOT_FOUND);
            store.dispatch('user/clear');
        }else{
            store.dispatch('services/get:error');
            store.dispatch('snackbar:show', services.message);
        }
    });

    store.on('services/get:success', (state, data)=>{
        store.dispatch('loading:false');
        return { services: data };
    });

    //TODO:: This is not being used. Fix!
    store.on('services/get:error', (state, error)=>{
        store.dispatch('loading:false');
        return { services: [] };
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

export const saveServiceAsync = async (dispatch, data) => {
    dispatch('loading:true');
    const newService = await makeApiCall("/api/vehicles/" + data.vehicle + "/service", { method: 'POST', body: data });
    return new Promise(resolve => {
        if( newService.status == ApiConstants.STATUS_SUCCESS ){
            dispatch('service/add:success', newService.data);
            resolve({ status: ApiConstants.STATUS_SUCCESS, data: newService.data[0] });
        }else{
            dispatch('service/add:error', newService.message);
            resolve({ status: ApiConstants.STATUS_ERROR, data: null });
        }
    });
}

export default services;