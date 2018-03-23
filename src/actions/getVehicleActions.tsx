import "isomorphic-fetch";
import { Dispatch } from "redux";

import types from "../types";

export function getAllVehicles() {
    return {
        type: "GET_ALL_VEHICLES_INIT",
        data: null
    };
}

export function getAllVehiclesAsync() {
    return function(dispatch: Dispatch<types.AppState>) {
        dispatch(getAllVehicles());
        fetch("http://localhost:4001/vehicles", {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then(function(response: any) {
                return response.text();
            })
            .then(function(response: any) {
                return JSON.parse(response);
            })
            .then(function(response: any) {
                dispatch(getAllVehiclesSuccess(response));
            })
            .catch(function(error: any) {
                dispatch(getAllVehiclesFailure(error));
            });
    };
}

export function getAllVehiclesSuccess(response: any) {
    return {
        type: "GET_ALL_VEHICLES_SUCCESS",
        vehicles: response.data
    };
}

export function getAllVehiclesFailure(error: any) {
    return {
        type: "GET_ALL_VEHICLES_FAILURE",
        data: { ...error }
    };
}
