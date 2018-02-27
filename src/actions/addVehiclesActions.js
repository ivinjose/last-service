import fetch from "isomorphic-fetch";

export function addVehiclesInit(details) {
    return {
        type: "ADD_VEHICLES_INIT",
        data: { ...details }
    };
}

export function addVehicles(vehicles) {
    return (dispatch) => {
        dispatch(addVehiclesInit());
        fetch("http://localhost:4001/vehicles", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(vehicles)
        })
            .then(function(response) {
                return response.text();
            })
            .then(function(response) {
                return JSON.parse(response);
            })
            .then(function(response) {
                dispatch(addVehiclesSuccess(response));
            })
            .catch(function(error) {
                dispatch(addVehiclesFailure(error));
            });
    };
}

export function addVehiclesSuccess({ data: vehiclesAdded, message }) {
    return {
        type: "ADD_VEHICLES_SUCCESS",
        vehiclesAdded,
        message
    };
}

export function addVehiclesFailure(error) {
    return {
        type: "ADD_VEHICLES_FAILURE",
        data: { ...error }
    };
}
