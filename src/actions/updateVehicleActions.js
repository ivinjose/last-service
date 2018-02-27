import fetch from "isomorphic-fetch";

export function updateVehicleInit(details) {
    return {
        type: "UPDATE_VEHICLE_INIT",
        data: { ...details }
    };
}

export function updateVehicle({ id, name, type }) {
    return (dispatch) => {
        dispatch(updateVehicleInit());
        fetch("http://localhost:4001/vehicles/" + id, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ name, type })
        })
            .then(function(response) {
                return response.text();
            })
            .then(function(response) {
                return JSON.parse(response);
            })
            .then(function(response) {
                dispatch(updateVehicleSuccess(response));
            })
            .catch(function(error) {
                dispatch(updateVehicleFailure(error));
            });
    };
}

export function updateVehicleSuccess({ data: vehicleUpdated, message }) {
    return {
        type: "UPDATE_VEHICLE_SUCCESS",
        vehicleUpdated,
        message
    };
}

export function updateVehicleFailure(error) {
    return {
        type: "UPDATE_VEHICLE_FAILURE",
        data: { ...error }
    };
}
