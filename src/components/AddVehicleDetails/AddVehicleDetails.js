import React from "react";
import ReactDOM from "react-dom";
import queryString from "query-string";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { store } from "../../store";
import { addVehicles, updateVehicle } from "../../actions/index";

import Header from "../common/Header";
import SubHeader from "../common/SubHeader";
import styles from "./AddVehicleDetails.css";
import globalStyles from "../../styles/global.css";
import TextField from "material-ui/TextField";
import SelectField from "material-ui/SelectField";
import MenuItem from "material-ui/MenuItem";
import RaisedButton from "material-ui/RaisedButton";

class AddVehicleDetails extends React.Component {
    constructor() {
        super();

        this.state = {
            editMode: false,
            pageTitle: "ADD NEW VEHICLE",
            vehicle: "",
            vehicleType: null,
            vehicleErrorMessage: "",
            vehicleTypeErrorMessage: ""
        };
    }

    componentDidMount() {
        this.checkModeAndSetupPage();
    }

    checkModeAndSetupPage() {
        var queryParams = queryString.parse(location.search);

        if (queryParams.editMode == "true") {
            let vehicle = this.props.vehicles.find((vehicle) => vehicle._id == queryParams.id);
            this.doEditModeConfiguration(vehicle);
        } else {
            this.doAddModeConfiguration();
        }
    }

    doEditModeConfiguration(vehicle) {
        this.setState({
            editMode: true,
            pageTitle: "UPDATE VEHICLE",
            vehicleId: vehicle._id,
            vehicle: vehicle.name,
            vehicleType: vehicle.type,
            vehicleErrorMessage: "",
            vehicleTypeErrorMessage: ""
        });
    }

    doAddModeConfiguration() {
        this.setState({
            editMode: false,
            pageTitle: "ADD NEW VEHICLE",
            vehicleId: null,
            vehicle: "",
            vehicleType: null,
            vehicleErrorMessage: "",
            vehicleTypeErrorMessage: ""
        });
    }

    render() {
        return (
            <div className={styles["vehicle-details"]}>
                <SubHeader text={this.state.pageTitle} />
                <div className={styles["body"]}>
                    <div className={globalStyles["row"]}>
                        <TextField
                            hintText="Vehicle name"
                            value={this.state.vehicle}
                            fullWidth={true}
                            errorText={this.state.vehicleErrorMessage}
                            onChange={this.updateVehicle.bind(this)}
                        />
                    </div>
                    <div className={globalStyles["row"]}>
                        <SelectField
                            hintText="Vehicle type"
                            fullWidth={true}
                            value={this.state.vehicleType}
                            errorText={this.state.vehicleTypeErrorMessage}
                            onChange={this.updateVehicleType.bind(this)}
                        >
                            <MenuItem key={"Two wheeler"} value={"Two wheeler"} primaryText="Two wheeler" />
                            <MenuItem key={"Four wheeler"} value={"Four wheeler"} primaryText="Four wheeler" />
                        </SelectField>
                    </div>

                    <div className={globalStyles["row"]}>
                        <RaisedButton
                            label={this.state.editMode ? "Update" : "Save"}
                            primary={true}
                            fullWidth={true}
                            onClick={
                                this.state.editMode
                                    ? this.updateVehicleDetails.bind(this)
                                    : this.saveVehicleDetails.bind(this)
                            }
                        />
                    </div>
                </div>
            </div>
        );
    }

    updateVehicle(event, newValue) {
        this.setState({
            vehicle: newValue,
            vehicleErrorMessage: ""
        });
    }

    updateVehicleType(event, key, payload) {
        this.setState({
            vehicleType: payload,
            vehicleTypeErrorMessage: ""
        });
    }

    saveVehicleDetails() {
        if (!this.isValidVehicle()) {
            return;
        }
        if (!this.isValidVehicleType()) {
            return;
        }
        const vehicle = {
            name: this.state.vehicle,
            user: store.getState().user._id,
            type: this.state.vehicleType
        };
        this.props.addVehicles([vehicle]);
    }

    updateVehicleDetails() {
        if (!this.isValidVehicle()) {
            return;
        }
        if (!this.isValidVehicleType()) {
            return;
        }
        const vehicle = {
            id: this.state.vehicleId,
            user: store.getState().user._id,
            name: this.state.vehicle,
            type: this.state.vehicleType
        };
        this.props.updateVehicle(vehicle);
    }

    isValidVehicle() {
        if (!this.state.vehicle) {
            this.setState({
                vehicleErrorMessage: "Please enter a name for the vehicle"
            });
            return false;
        } else {
            this.setState({
                vehicleErrorMessage: ""
            });
            return true;
        }
    }

    isValidVehicleType() {
        if (!this.state.vehicleType) {
            this.setState({
                vehicleTypeErrorMessage: "Please choose a vehicle type"
            });
            return false;
        } else {
            this.setState({
                vehicleTypeErrorMessage: ""
            });
            return true;
        }
    }
}

function mapStateToProps(state) {
    return {
        vehicles: state.vehicles
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({ addVehicles, updateVehicle }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(AddVehicleDetails);
