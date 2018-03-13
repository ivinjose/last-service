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

class Services extends React.Component<any, any> {
    constructor() {
        super();
        this.state = {
            vehicles: [],
            currentVehicle: null,
            serviceDetails: null
        };
    }

    componentDidMount() {
        let queryParams = queryString.parse(this.props.location.search);
        if (queryParams && queryParams.vehicle) {
            this.chooseVehicle(null, null, queryParams.vehicle);
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

    chooseVehicle(event: any, key: any, payload: any) {
        this.setState({
            currentVehicle: payload
        });
        this.setState({
            serviceDetails: this.getServiceDetailsOf(payload)
        });
    }

    getServiceDetailsOf(vehicle: any) {
        let services = this.props.services.filter((service: any) => service.vehicle == vehicle);
        return services;
    }
}

function mapStateToProps(state: any) {
    return {
        services: state.services,
        vehicles: state.vehicles
    };
}

export default connect(mapStateToProps)(Services);
