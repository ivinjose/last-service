import { combineReducers } from "redux";

import vehicles from "./vehiclesReducer";
import services from "./servicesReducer";
import ui from "./uiReducer";
import user from "./userReducer";

const rootReducer = combineReducers({
    ui,
    user,
    services,
    vehicles
});

export default rootReducer;
