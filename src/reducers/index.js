import { combineReducers } from 'redux';

import vehicles from './vehicles';
import services from './services';
import ui from './ui';

const rootReducer = combineReducers({
    ui,
    services,
    vehicles
});

export default rootReducer;

