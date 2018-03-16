import React from "react";
import ReactDOM from "react-dom";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import queryString from "query-string";

import styles from "./Services.css";
import globalStyles from "../../styles/global.css";
import ServiceDetails from "../ServiceDetails";
import Header from "../common/Header";
import SubHeader from "../common/SubHeader";
import SelectField from "material-ui/SelectField";
import MenuItem from "material-ui/MenuItem";
import types from "../../types";

interface Props {
    services: types.Service[];
    vehicles: types.Vehicle[];
    location: any;
}

interface State {
    currentVehicle: string;
    serviceDetails: types.Service[];
}

class Services extends React.Component<Props, State> {
    constructor() {
        super();
        this.state = {
            currentVehicle: "",
            serviceDetails: []
        };
    }

    componentDidMount() {
        let queryParams = queryString.parse(this.props.location.search);
        if (queryParams && queryParams.vehicle) {
            this.chooseVehicle(null, -1, queryParams.vehicle);
        }
    }

    render() {
        return (
            <div className={styles["services"]}>
                <SubHeader text={"MY SERVICES"} />
                <div className={styles["body"]}>
                    <div className={globalStyles["row"]}>
                        <SelectField
                            hintText="Choose your vehicle"
                            fullWidth={true}
                            value={this.state.currentVehicle}
                            onChange={this.chooseVehicle.bind(this)}
                        >
                            {this.props.vehicles.map(function(vehicle: any, index: number) {
                                return <MenuItem key={vehicle._id} value={vehicle._id} primaryText={vehicle.name} />;
                            })}
                        </SelectField>
                    </div>

                    {this.state && this.state.serviceDetails && <ServiceDetails data={this.state.serviceDetails} />}
                </div>
            </div>
        );
    }

    chooseVehicle(event: any, key: number, payload: string): void {
        this.setState({
            currentVehicle: payload
        });
        this.setState({
            serviceDetails: this.getServiceDetailsOf(payload)
        });
    }

    getServiceDetailsOf(vehicle: string): types.Service[] {
        let services = this.props.services.filter((service: types.Service) => service.vehicle == vehicle);
        return services;
    }
}

function mapStateToProps(state: types.AppState) {
    return {
        services: state.services,
        vehicles: state.vehicles
    };
}

export default connect(mapStateToProps)(Services);
