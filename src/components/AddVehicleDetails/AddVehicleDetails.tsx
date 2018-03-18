import React from "react";
import ReactDOM from "react-dom";
import { Dispatch } from "redux";
import { RouteComponentProps } from "react-router-dom";
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

import types from "../../types";

interface Props extends RouteComponentProps<any> {
    vehicles: types.Vehicle[];
    addVehicles(vehicles: types.Vehicle[]): void;
    updateVehicle(vehicle: types.Vehicle): void;
}

interface State {
    editMode: boolean;
    pageTitle: string;
    vehicleId: string;
    vehicle: string;
    vehicleType: string;
    vehicleErrorMessage: string;
    vehicleTypeErrorMessage: string;
}

class AddVehicleDetails extends React.Component<Props, State> {
    constructor() {
        super();

        this.state = {
            editMode: false,
            pageTitle: "ADD NEW VEHICLE",
            vehicleId: "",
            vehicle: "",
            vehicleType: "",
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
            let vehicle = this.props.vehicles.find((vehicle: types.Vehicle) => vehicle._id == queryParams.id);
            console.log("vehicle", vehicle);
            this.doEditModeConfiguration(vehicle);
        } else {
            this.doAddModeConfiguration();
        }
    }

    doEditModeConfiguration(vehicle: types.Vehicle | undefined) {
        if (!vehicle) {
            return;
        }
        this.setState({
            editMode: true,
            pageTitle: "UPDATE VEHICLE",
            vehicleId: vehicle._id || "",
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
            vehicleId: "",
            vehicle: "",
            vehicleType: "",
            vehicleErrorMessage: "",
            vehicleTypeErrorMessage: ""
        });
    }

    render() {
        return (
            <div className={styles.vehicleDetails}>
                <SubHeader text={this.state.pageTitle} />
                <div className={styles.body}>
                    <div className={globalStyles.row}>
                        <TextField
                            hintText="Vehicle name"
                            value={this.state.vehicle}
                            fullWidth={true}
                            errorText={this.state.vehicleErrorMessage}
                            onChange={this.updateVehicle.bind(this)}
                        />
                    </div>
                    <div className={globalStyles.row}>
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

                    <div className={globalStyles.row}>
                        <RaisedButton
                            label={this.state.editMode ? "Update" : "Save"}
                            primary={true}
                            fullWidth={true}
                            onClick={this.state.editMode ? this.updateVehicleDetails.bind(this) : this.saveVehicleDetails.bind(this)}
                        />
                    </div>
                </div>
            </div>
        );
    }

    updateVehicle(event: React.FormEvent<HTMLSelectElement>, newValue: string) {
        this.setState({
            vehicle: newValue,
            vehicleErrorMessage: ""
        });
    }

    updateVehicleType(event: React.FormEvent<HTMLSelectElement>, key: number, payload: string) {
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

function mapStateToProps(state: types.AppState) {
    return {
        vehicles: state.vehicles
    };
}

function mapDispatchToProps(dispatch: Dispatch<types.AppState>) {
    return bindActionCreators({ addVehicles, updateVehicle }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(AddVehicleDetails);
