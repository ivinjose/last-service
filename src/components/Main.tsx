import React from "react";
import { Route, Switch, Redirect, RouteProps } from "react-router-dom";
import { Location } from "history";
import { store } from "../store";
import queryString from "query-string";
import PageBlocker from "./Ui/PageBlocker";
import RefreshIndicator from "material-ui/RefreshIndicator";
import Snackbar from "material-ui/Snackbar";
import Header from "./common/Header";
import Home from "./Home";
import Login from "./Login";
import User from "./User";
import Services from "./Services";
import Vehicles from "./Vehicles";
import AddServiceDetails from "./AddServiceDetails";
import AddVehicleDetails from "./AddVehicleDetails";
import types from "../types";

interface Props {
    user: types.User;
    location: Location;
    ui: {
        showPageBlockingLoader: boolean;
        showPlaceholderLoader: boolean;
        snackbarMessage: string;
    };
}

class Main extends React.Component<Props, {}> {
    render() {
        return (
            <div>
                <Header title={"Service Manager"} user={this.props.user || {}} />
                {this.props.ui.showPageBlockingLoader && (
                    <PageBlocker>
                        <RefreshIndicator
                            size={50}
                            left={0}
                            top={0}
                            loadingColor="#FF9800"
                            status="loading"
                            style={{ position: "relative" }}
                        />
                    </PageBlocker>
                )}
                <Snackbar
                    open={this.props.ui.snackbarMessage ? true : false}
                    message={this.props.ui.snackbarMessage ? this.props.ui.snackbarMessage : ""}
                    autoHideDuration={2000}
                />
                <Switch>
                    <Route path="/login" component={Login} />
                    <Route path="/user" component={User} />
                    <PrivateRoute exact path="/" component={Home} />
                    <PrivateRoute path="/services" component={Services} />
                    <PrivateRoute path="/vehicles" component={Vehicles} />
                    <PrivateRoute path="/addservice" component={AddServiceDetails} />
                    <PrivateRoute path="/addvehicle" component={AddVehicleDetails} />
                </Switch>
            </div>
        );
    }
}

interface PrivateRouteProps extends RouteProps {
    component: React.ComponentType<any>;
}

const PrivateRoute = (props: PrivateRouteProps) => {
    let { component: Component, ...rest } = props;
    return (
        <Route
            {...rest}
            render={(props) => {
                return isUserLoggedIn() ? <Component {...props} /> : <Redirect to="/login" />;
            }}
        />
    );
};

function isUserLoggedIn(): boolean {
    const state = store.getState();
    return state.user._id ? true : false;
}

export default Main;
