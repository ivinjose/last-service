import React from 'react';
import { Route, Switch } from 'react-router-dom';

import PageBlocker from './Ui/PageBlocker'
import RefreshIndicator from 'material-ui/RefreshIndicator';
import Header from './common/Header';
import Home from './Home';
import Login from './Login';
import User from './User';
import ViewServiceDetails from './ViewServiceDetails';
import AddServiceDetails from './AddServiceDetails';
import AddVehicleDetails from './AddVehicleDetails';
import ViewVehicleDetails from './ViewVehicleDetails';

class Main extends React.Component{
    render(){
        return(
            <div>
                <Header title={"Service Manager"} user={this.props.user}/>
                {this.props.ui.blockUi &&
                    <PageBlocker>
                        <RefreshIndicator
                            size={50}
                            left={0}
                            top={0}
                            loadingColor="#FF9800"
                            status="loading"
                            style={{position: 'relative'}}
                        />
                    </PageBlocker>
                }
                <Switch>
                    <Route exact path="/" >
                        <Home {...this.props} />
                    </Route>
                    <Route path="/user" >
                        <User {...this.props} />
                    </Route>
                    <Route path="/login">
                        <Login {...this.props} />
                    </Route>
                    <Route path="/login/success">
                        <Login {...this.props} />
                    </Route>
                    <Route path="/addservice">
                        <AddServiceDetails {...this.props} />
                    </Route>
                    <Route path="/view">
                        <ViewServiceDetails {...this.props} />
                    </Route>
                    <Route path="/addvehicle">
                        <AddVehicleDetails {...this.props} />
                    </Route>
                    <Route path="/viewvehicles">
                        <ViewVehicleDetails {...this.props} />
                    </Route> 
                </Switch>
            </div>
        );
    }
}

export default Main;