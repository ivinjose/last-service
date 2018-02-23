import fetch from "isomorphic-fetch";

export function getAllVehicles() {
    return {
        type: "GET_ALL_VEHICLES_REQUEST",
        data: null
    };
}

export function getAllVehiclesAsync() {
    return function(dispatch) {
        dispatch(getAllVehicles());
        fetch("http://localhost:4001/vehicles", {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then(function(response) {
                return response.text();
            })
            .then(function(response) {
                return JSON.parse(response);
            })
            .then(function(response) {
                dispatch(getAllVehiclesSuccess(response));
            })
            .catch(function(error) {
                dispatch(getAllVehiclesFailure(error));
            });
    };
}

export function getAllVehiclesSuccess(response) {
    return {
        type: "GET_ALL_VEHICLES_SUCCESS",
        vehicles: response.data
    };
}

export function getAllVehiclesFailure(error) {
    return {
        type: "GET_ALL_VEHICLES_FAILURE",
        data: { ...error }
    };
}
