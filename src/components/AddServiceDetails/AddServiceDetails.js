import React from "react";
import ReactDOM from "react-dom";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { store } from "../../store";

import { addServices } from "../../actions/index";

import Header from "../common/Header";
import SubHeader from "../common/SubHeader";
import ServicedItem from "./AddServicedItem";
import styles from "./AddServiceDetails.css";
import globalStyles from "../../styles/global.css";

import SelectField from "material-ui/SelectField";
import MenuItem from "material-ui/MenuItem";
import DatePicker from "material-ui/DatePicker";
import AutoComplete from "material-ui/AutoComplete";
import TextField from "material-ui/TextField";
import RaisedButton from "material-ui/RaisedButton";

let DateTimeFormat = global.Intl.DateTimeFormat; //IntlPolyfill.DateTimeFormat;

const serviceableParts = [
    "Engine oil",
    "Break fluid",
    "Air filter",
    "Break disc",
    "Front wiper blade",
    "Read wiper blade"
];

class AddServiceDetails extends React.Component {
    constructor() {
        super();

        this.state = {
            currentVehicle: null,
            userErrorMessage: "",
            vehicleErrorMessage: "",
            dateErrorMessage: "",
            componentErrorMessage: "",
            amountErrorMessage: ""
        };
    }

    render() {
        return (
            <div className={styles["service-details"]}>
                <SubHeader text={"ADD NEW SERVICE"} />
                <div className={styles["body"]}>
                    <div className={globalStyles["row"]}>
                        <SelectField
                            hintText="Choose your vehicle"
                            fullWidth={true}
                            value={this.state.currentVehicle}
                            errorText={this.state.vehicleErrorMessage}
                            onChange={this.updateVehicle.bind(this)}
                        >
                            {this.props.vehicles.map(function(vehicle, index) {
                                return <MenuItem key={vehicle._id} value={vehicle._id} primaryText={vehicle.name} />;
                            })}
                        </SelectField>
                    </div>

                    <div className={globalStyles["row"]}>
                        <DatePicker
                            hintText="On which date service happened?"
                            onChange={this.updateDate.bind(this)}
                            fullWidth={true}
                            errorText={this.state.dateErrorMessage}
                            formatDate={
                                new DateTimeFormat("en-US", {
                                    day: "numeric",
                                    month: "long",
                                    year: "numeric"
                                }).format
                            }
                        />
                    </div>

                    <div className={globalStyles["row"]}>
                        <AutoComplete
                            hintText="Which part was serviced?"
                            dataSource={serviceableParts}
                            fullWidth={true}
                            errorText={this.state.componentErrorMessage}
                            filter={AutoComplete.caseInsensitiveFilter}
                            onUpdateInput={this.updateServicedComponent.bind(this)}
                        />
                    </div>

                    <div className={globalStyles["row"]}>
                        <TextField
                            hintText="How much you paid?"
                            fullWidth={true}
                            errorText={this.state.amountErrorMessage}
                            onChange={this.updateAmount.bind(this)}
                        />
                    </div>

                    <div className={globalStyles["row"]}>
                        <TextField
                            hintText="Any comments? (Optional)"
                            fullWidth={true}
                            onChange={this.updateComments.bind(this)}
                        />
                    </div>

                    <div className={globalStyles["row"]}>
                        <RaisedButton
                            label="Save"
                            primary={true}
                            fullWidth={true}
                            onClick={this.saveServicedItem.bind(this)}
                        />
                    </div>
                </div>
            </div>
        );
    }

    updateVehicle(event, key, payload) {
        this.setState({
            currentVehicle: payload,
            vehicleErrorMessage: ""
        });
    }

    updateDate(event, date) {
        this.setState({
            date: date,
            dateErrorMessage: ""
        });
    }

    updateServicedComponent(searchText, dataSource, params) {
        this.setState({
            component: searchText,
            componentErrorMessage: ""
        });
    }

    updateAmount(event, newValue) {
        this.setState({
            amount: newValue,
            amountErrorMessage: ""
        });
    }

    updateComments(event, newValue) {
        this.setState({
            comments: newValue
        });
    }

    saveServicedItem(e) {
        if (!this.isValidVehicle()) {
            return;
        }
        if (!this.isValidDate()) {
            return;
        }
        if (!this.isValidComponent()) {
            return;
        }
        if (!this.isValidAmount()) {
            return;
        }
        let service = {
            user: store.getState().user._id,
            vehicle: this.state.currentVehicle,
            date: this.state.date,
            component: this.state.component,
            amount: this.state.amount,
            comments: this.state.comments
        };
        this.props.addServices([service]);
    }

    isValidVehicle() {
        if (!this.state.currentVehicle) {
            this.setState({
                vehicleErrorMessage: "Please choose the vehicle"
            });
            return false;
        } else {
            this.setState({
                vehicleErrorMessage: ""
            });
            return true;
        }
    }

    isValidDate() {
        if (!this.state.date) {
            this.setState({
                dateErrorMessage: "Please choose the date of service"
            });
            return false;
        } else {
            this.setState({
                dateErrorMessage: ""
            });
            return true;
        }
    }

    isValidComponent() {
        if (!this.state.component) {
            this.setState({
                componentErrorMessage: "Please specify the part that was serviced"
            });
            return false;
        } else {
            this.setState({
                componentErrorMessage: ""
            });
            return true;
        }
    }

    isValidAmount() {
        if (!this.state.amount) {
            this.setState({
                amountErrorMessage: "Please specify the amount spent"
            });
            return false;
        } else {
            this.setState({
                amountErrorMessage: ""
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
    return bindActionCreators({ addServices }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(AddServiceDetails);
