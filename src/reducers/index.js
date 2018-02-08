import { combineReducers } from 'redux';

import vehicles from './vehiclesReducer';
import services from './servicesReducer';
import ui from './uiReducer';

const rootReducer = combineReducers({
    ui,
    services,
    vehicles
});

export default rootReducer;

