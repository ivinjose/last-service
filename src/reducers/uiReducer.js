const ui = function(state = [], action) {
    let newState;
    switch (action.type) {
        /**
         * GET USER VEHICLES, GET USER SERVICES actions
         */
        case "GET_USER_VEHICLES_INIT":
        case "GET_USER_SERVICES_INIT":
            newState = Object.assign({}, state, { showPlaceholderLoader: true, snackbarMessage: null });
            return newState;
            break;
        case "GET_USER_VEHICLES_SUCCESS":
        case "GET_USER_SERVICES_SUCCESS":
        case "GET_USER_VEHICLES_FAILURE":
        case "GET_USER_SERVICES_FAILURE":
            newState = Object.assign({}, state, { showPlaceholderLoader: false, snackbarMessage: null });
            return newState;
            break;

        /**
         * VEHICLE actions
         */
        case "ADD_VEHICLES_INIT":
        case "UPDATE_VEHICLE_INIT":
            newState = Object.assign({}, state, { showPageBlockingLoader: true, snackbarMessage: null });
            return newState;
            break;
        case "ADD_VEHICLES_SUCCESS":
        case "ADD_VEHICLES_FAILURE":
        case "UPDATE_VEHICLE_SUCCESS":
        case "UPDATE_VEHICLE_FAILURE":
            newState = Object.assign({}, state, { showPageBlockingLoader: false, snackbarMessage: action.message });
            return newState;
            break;

        /**
         * SERVICE actions
         */
        case "ADD_SERVICES_INIT":
            newState = Object.assign({}, state, { showPageBlockingLoader: true, snackbarMessage: null });
            return newState;
            break;
        case "ADD_SERVICES_SUCCESS":
        case "ADD_SERVICES_FAILURE":
            newState = Object.assign({}, state, { showPageBlockingLoader: false, snackbarMessage: action.message });
            return newState;
            break;

        /**
         * All other actions
         */
        case "GET_USER_INIT":
        case "GET_ALL_VEHICLES_INIT":
        case "GET_ALL_SERVICES_INIT":
            newState = Object.assign({}, state, { showPageBlockingLoader: true, snackbarMessage: null });
            return newState;
            break;
        case "GET_USER_SUCCESS":
        case "GET_ALL_VEHICLES_SUCCESS":
        case "GET_ALL_SERVICES_SUCCESS":
            newState = Object.assign({}, state, { showPageBlockingLoader: false, snackbarMessage: null });
            return newState;
            break;
        case "GET_USER_FAILURE":
        case "GET_ALL_VEHICLES_FAILURE":
        case "GET_ALL_SERVICES_FAILURE":
            newState = Object.assign({}, state, { showPageBlockingLoader: false, snackbarMessage: null });
            return newState;
            break;
        default:
            return state;
    }
};

export default ui;
