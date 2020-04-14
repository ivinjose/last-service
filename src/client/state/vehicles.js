import makeApiCall from "../utils/ApiHelper";
import Strings from "../constants/StringConstants";
import ApiConstants from "../constants/ApiConstants";

const vehicles = store => {
    store.on('@init', ()=>({ vehicles: [] }));

    store.on('vehicles/get', async (state, userId)=>{
        store.dispatch('loading:true');
        const vehicles = await makeApiCall("/api/users/" + userId + "/vehicles", { method: 'GET' });
        store.dispatch('vehicles/get:success', vehicles.data);
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

    /**
     * The below mthod is not used anymore.
     * Its replaced by the promisified version saveVehiclesAsync
     * Keeping this one only for reference.
     */
    /* store.on('vehicles/add', async (state, data)=>{
        store.dispatch('loading:true');
        const newVehicles = await makeApiCall("/api/users/" + data.userId + "/vehicles", { method: 'POST', body: data.vehicles });
        store.dispatch('vehicles/add:success', newVehicles.data);
    }); */

    store.on('vehicles/add:success', (state, newVehicles)=>{
        store.dispatch('loading:false');
        store.dispatch('snackbar:show', Strings.SNACKBAR_MESSAGES.VEHICLE_ADD_SUCCESS);
        return { vehicles: [ ...state.vehicles, ...newVehicles ] };
    });

    store.on('vehicles/add:error', (state, error)=>{
        store.dispatch('loading:false');
        console.log('Error in adding vehicles', error);
        return { vehicles: state.vehicles };
    });
};

export const saveVehiclesAsync = async (dispatch, data) => {
    dispatch('loading:true');
    const newVehicles = await makeApiCall("/api/users/" + data.userId + "/vehicles", { method: 'POST', body: data.vehicles });
    return new Promise(resolve => {
        if( newVehicles.status == ApiConstants.STATUS_SUCCESS ){
            dispatch('vehicles/add:success', newVehicles.data);
            resolve(ApiConstants.STATUS_SUCCESS);
        }else{
            dispatch('vehicles/add:error', newVehicles.message);
            resolve(ApiConstants.STATUS_ERROR);
        }
    });
};

export default vehicles;