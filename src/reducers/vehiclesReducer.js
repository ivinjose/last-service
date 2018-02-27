const vehicles = function(state = [], action) {
    switch (action.type) {
        // Update vehicle flow
        case "UPDATE_VEHICLE_SUCCESS":
            const i = state.findIndex((vehicle) => vehicle._id == action.vehicleUpdated._id);
            return [...state.slice(0, i), action.vehicleUpdated, ...state.slice(i + 1)];
            break;
        case "UPDATE_VEHICLE_FAILURE":
            console.log("UPDATE_VEHICLE_FAILURE");
            return state;
            break;

        // Add vehicle flow
        case "ADD_VEHICLES_SUCCESS":
            return [...state, ...action.vehiclesAdded];
            break;
        case "ADD_VEHICLES_FAILURE":
            console.log("ADD_VEHICLE_FAILURE");
            return state;
            break;

        // Get all vehicles flow
        case "GET_USER_VEHICLES_SUCCESS":
        case "GET_ALL_VEHICLES_SUCCESS":
            /* 
             * Here we dont want to maintain the vehicles already in the state. 
             * Since it's a get all vehicles call, we wipe existing state and refill with new and complete list.
             */
            return [...action.vehicles];
            break;
        case "GET_USER_VEHICLES_FAILURE":
        case "GET_ALL_VEHICLES_FAILURE":
            console.log("GET_ALL_VEHICLES_FAILURE");
            return state;
            break;
        default:
            return state;
    }
};

export default vehicles;
