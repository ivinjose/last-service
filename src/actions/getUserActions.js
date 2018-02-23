import fetch from "isomorphic-fetch";

export function getUserInit() {
    return {
        type: "GET_USER_INIT",
        data: null
    };
}

export function getUser(uid) {
    return function(dispatch) {
        dispatch(getUserInit());
        fetch("http://localhost:4001/users/" + uid, {
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
                dispatch(getUserSuccess(response));
            })
            .catch(function(error) {
                dispatch(getUserFailure(error));
            });
    };
}

export function getUserSuccess(response) {
    return {
        type: "GET_USER_SUCCESS",
        user: response.data
    };
}

export function getUserFailure(error) {
    return {
        type: "GET_USER_FAILURE",
        data: { ...error }
    };
}

//--------------------------------------
/**
 * Get vehicles of the user
 */
export function getUserVehiclesInit() {
    return {
        type: "GET_USER_VEHICLES_INIT",
        data: null
    };
}

export function getUserVehicles(uid) {
    return function(dispatch) {
        dispatch(getUserVehiclesInit());
        fetch("http://localhost:4001/users/" + uid + "/vehicles", {
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
                dispatch(getUserVehiclesSuccess(response));
            })
            .catch(function(error) {
                dispatch(getUserVehiclesFailure(error));
            });
    };
}

export function getUserVehiclesSuccess(response) {
    return {
        type: "GET_USER_VEHICLES_SUCCESS",
        vehicles: response.data
    };
}

export function getUserVehiclesFailure(error) {
    return {
        type: "GET_USER_VEHICLES_FAILURE",
        data: { ...error }
    };
}
