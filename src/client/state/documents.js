import makeApiCall from "../utils/ApiHelper";
import ApiConstants from "../constants/ApiConstants";

const documents = store => {
    store.on('@init', ()=>({ documents: [] }));

    store.on('documents/clear', ()=>({ documents: [] }));

    store.on('documents/get', async (state, user)=>{
        store.dispatch('loading:true');
        const documents = await makeApiCall("/api/users/" + user + "/documents", { method: 'GET' });
        if( vehicles.status === ApiConstants.UNAUTHORIZED ){
            store.dispatch('documents/get:error');
            store.dispatch('snackbar:show', Strings.SNACKBAR_MESSAGES.COOKIE_NOT_FOUND);
            store.dispatch('user/clear');
            return;
        }
        store.dispatch('documents/get:success', documents.data);
    });

    store.on('documents/vehicle/get', async (state, vehicle)=>{
        store.dispatch('loading:true');
        const documents = await makeApiCall("/api/vehicles/" + vehicle + "/documents", { method: 'GET' });
        if( vehicles.status === ApiConstants.UNAUTHORIZED ){
            store.dispatch('documents/get:error');
            store.dispatch('snackbar:show', Strings.SNACKBAR_MESSAGES.COOKIE_NOT_FOUND);
            store.dispatch('user/clear');
            return;
        }
        store.dispatch('documents/get:success', documents.data);
    });

    store.on('documents/get:success', (state, data)=>{
        store.dispatch('loading:false');
        return { documents: data };
    });

    //TODO:: This is not being used. Fix!
    store.on('documents/get:error', (state, error)=>{
        store.dispatch('loading:false');
        console.log('Error in fetching documents', error);
        return { documents: [] };
    });

    store.on('document/add:success', (state, newDocument)=>{
        store.dispatch('loading:false');
        return { documents: [ ...state.documents, ...newDocument ] };
    });

    store.on('document/add:error', (state, error)=>{
        store.dispatch('loading:false');
        console.log('Error in adding document', error);
        return { documents: state.documents };
    });
};

export const saveDocumentAsync = async (dispatch, data) => {
    dispatch('loading:true');
    const newDocument = await makeApiCall("/api/users/" + data.userId + "/document", { method: 'POST', body: data });
    return new Promise(resolve => {
        if( newDocument.status == ApiConstants.STATUS_SUCCESS ){
            dispatch('document/add:success', newDocument.data);
            resolve({ status: ApiConstants.STATUS_SUCCESS, data: newDocument.data[0] });
        }else{
            dispatch('document/add:error', newDocument.message);
            resolve({ status: ApiConstants.STATUS_ERROR, data: null });
        }
    });
}

export default documents;