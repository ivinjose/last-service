import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";

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
                    <Route path="/user" component={User} />
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

// const PrivateRoute = ({ component: Component, ...rest }) => {
//     console.log("...rest:", rest);
//     return (
//         <Route
//             {...rest}
//             render={(props) => {
//                 console.log("internal props:", props);
//                 // return rest.children.props.user != null ? <Component {...props} /> : <Redirect to="/login" />;
//                 return <Redirect to="/login" />;
//             }}
//         />
//     );
// };

export default Main;
