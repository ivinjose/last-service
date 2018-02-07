import { combineReducers } from 'redux';

import foo from './foo';
import bar from './bar';
import vehicles from './vehicles';

const rootReducer = combineReducers({
    foo,
    bar,
    vehicles
});

export default rootReducer;

