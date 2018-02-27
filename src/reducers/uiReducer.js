const ui = function(state = [], action) {
    let newState;
    switch (action.type) {
        case "GET_USER_VEHICLES_INIT":
        case "GET_USER_SERVICES_INIT":
            newState = Object.assign({}, state, { showPlaceholderLoader: true });
            return newState;
            break;
        case "GET_USER_VEHICLES_SUCCESS":
        case "GET_USER_SERVICES_SUCCESS":
        case "GET_USER_VEHICLES_FAILURE":
        case "GET_USER_SERVICES_FAILURE":
            newState = Object.assign({}, state, { showPlaceholderLoader: false });
            return newState;
            break;
        case "GET_USER_INIT":
        case "ADD_VEHICLES_INIT":
        case "ADD_SERVICES_INIT":
        case "UPDATE_VEHICLE_INIT":
        case "GET_ALL_VEHICLES_INIT":
        case "GET_ALL_SERVICES_INIT":
            newState = Object.assign({}, state, { showPageBlockingLoader: true });
            return newState;
            break;
        case "GET_USER_SUCCESS":
        case "ADD_VEHICLES_SUCCESS":
        case "ADD_SERVICES_SUCCESS":
        case "UPDATE_VEHICLE_SUCCESS":
        case "GET_ALL_VEHICLES_SUCCESS":
        case "GET_ALL_SERVICES_SUCCESS":
            newState = Object.assign({}, state, { showPageBlockingLoader: false });
            return newState;
            break;
        case "GET_USER_FAILURE":
        case "ADD_VEHICLES_FAILURE":
        case "ADD_SERVICES_FAILURE":
        case "UPDATE_VEHICLE_FAILURE":
        case "GET_ALL_VEHICLES_FAILURE":
        case "GET_ALL_SERVICES_FAILURE":
            newState = Object.assign({}, state, { showPageBlockingLoader: false });
            return newState;
            break;
        default:
            return state;
    }
};

export default ui;
