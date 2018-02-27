import fetch from "isomorphic-fetch";

export function addServicesInit(details) {
    return {
        type: "ADD_SERVICES_INIT",
        data: { ...details }
    };
}

export function addServices(services) {
    return (dispatch) => {
        dispatch(addServicesInit());
        fetch("http://localhost:4001/services", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(services)
        })
            .then(function(response) {
                return response.text();
            })
            .then(function(response) {
                return JSON.parse(response);
            })
            .then(function(response) {
                dispatch(addServicesSuccess(response));
            })
            .catch(function(error) {
                dispatch(addServicesFailure(error));
            });
    };
}

export function addServicesSuccess({ servicesAdded, message }) {
    return {
        type: "ADD_SERVICES_SUCCESS",
        servicesAdded,
        message
    };
}

export function addServicesFailure(error) {
    return {
        type: "ADD_SERVICES_FAILURE",
        data: { ...error }
    };
}
