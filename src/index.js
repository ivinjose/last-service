import React from "react";
import ReactDOM from "react-dom";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";
import { store, persistor } from "./store";
import { PersistGate } from "redux-persist/integration/react";

import App from "./App";

const Root = () => (
    <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
            <MuiThemeProvider>
                <Router>
                    <App />
                </Router>
            </MuiThemeProvider>
        </PersistGate>
    </Provider>
);

document.addEventListener("DOMContentLoaded", function() {
    ReactDOM.render(<Root />, document.getElementById("mount"));
});
