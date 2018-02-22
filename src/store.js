import { createStore, compose, applyMiddleware } from "redux";
import thunkMiddleware from "redux-thunk";
import logger from "redux-logger";
import defaultState from "./defaultState";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import rootReducer from "./reducers/index";

const persistConfig = {
    key: "root",
    storage
};
const persistedReducer = persistReducer(persistConfig, rootReducer);
const middleware = applyMiddleware(thunkMiddleware, logger);

const store = createStore(
    persistedReducer,
    defaultState,
    compose(middleware, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())
);

let persistor = persistStore(store);
export { store, persistor };
