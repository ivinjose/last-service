import { combineReducers } from 'redux';

import foo from './foo';
import bar from './bar';

const rootReducer = combineReducers({
    foo,
    bar
});

export default rootReducer;

