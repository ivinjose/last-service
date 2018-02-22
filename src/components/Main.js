import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import { store } from "../store";
import queryString from "query-string";

import PageBlocker from "./Ui/PageBlocker";
import RefreshIndicator from "material-ui/RefreshIndicator";
import Header from "./common/Header";
import Home from "./Home";
import Login from "./Login";
import User from "./User";
import ViewServiceDetails from "./ViewServiceDetails";
import AddServiceDetails from "./AddServiceDetails";
import AddVehicleDetails from "./AddVehicleDetails";
import ViewVehicleDetails from "./ViewVehicleDetails";

class Main extends React.Component {
    componentDidMount() {
        let queryParams = queryString.parse(this.props.location.search);
        if (queryParams && queryParams.uid) {
            this.props.getUser(queryParams.uid);
        }
    }
    render() {
        return (
            <div>
                <Header title={"Service Manager"} user={this.props.user} />
                {this.props.ui.blockUi && (
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
                <Switch>
                    <Route exact path="/" component={Home} />
                    <PrivateRoute path="/user" component={User} />
                    <Route path="/login" component={Login} />
                    <Route path="/login/success" component={Login} />
                    <Route path="/addservice" component={AddServiceDetails} />
                    <Route path="/view" component={ViewServiceDetails} />
                    <Route path="/addvehicle" component={AddVehicleDetails} />
                    <Route path="/viewvehicles" component={ViewVehicleDetails} />
                </Switch>
            </div>
        );
    }
}

const PrivateRoute = ({ component: Component, ...rest }) => {
    return (
        <Route
            {...rest}
            render={(props) => {
                return isUserLoggedIn() ? <Component {...props} /> : <Redirect to="/login" />;
            }}
        />
    );
};

function isUserLoggedIn() {
    const state = store.getState();
    return state.user._id ? true : false;
}

export default Main;
