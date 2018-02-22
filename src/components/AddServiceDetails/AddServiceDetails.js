import React from "react";
import ReactDOM from "react-dom";
import PropTypes from "prop-types";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";

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
import Snackbar from "material-ui/Snackbar";

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
            snackbarState: false,
            snackbarMessage: " "
        };
    }

    render() {
        return (
            <div className={styles["service-details"]}>
                <SubHeader text={"ADD SERVICE DETAILS"} />
                <div className={styles["body"]}>
                    <div className={globalStyles["row"]}>
                        <SelectField
                            hintText="Choose your vehicle"
                            fullWidth={true}
                            value={this.state.currentVehicle}
                            onChange={this.updateVehicle.bind(this)}
                        >
                            {this.props.vehicles.map(function(vehicle, index) {
                                return <MenuItem key={vehicle._id} value={vehicle.name} primaryText={vehicle.name} />;
                            })}
                        </SelectField>
                    </div>

                    <div className={globalStyles["row"]}>
                        <DatePicker
                            hintText="On which date service happened?"
                            onChange={this.updateDate.bind(this)}
                            fullWidth={true}
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
                            filter={AutoComplete.caseInsensitiveFilter}
                            onUpdateInput={this.updateServicedComponent.bind(this)}
                        />
                    </div>

                    <div className={globalStyles["row"]}>
                        <TextField
                            hintText="How much you paid?"
                            fullWidth={true}
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

                <Snackbar
                    open={this.state.snackbarState}
                    message={this.state.snackbarMessage}
                    autoHideDuration={2000}
                    onRequestClose={this.handleRequestClose}
                />
            </div>
        );
    }

    closeSnackbar() {
        this.setState({
            snackbarState: false
        });
    }

    updateVehicle(event, key, payload) {
        this.setState({
            currentVehicle: payload
        });
    }

    updateDate(event, date) {
        this.setState({
            date: date
        });
    }

    updateServicedComponent(searchText, dataSource, params) {
        this.setState({
            component: searchText
        });
    }

    updateAmount(event, newValue) {
        this.setState({
            amount: newValue
        });
    }

    updateComments(event, newValue) {
        this.setState({
            comments: newValue
        });
    }

    saveServicedItem(e) {
        let { store } = this.context;
        let currentVehicle = { vehicle: this.state.currentVehicle };
        let date = this.state.date;
        let component = this.state.component;
        let amount = this.state.amount;
        let comments = this.state.comments;

        let service = {
            vehicle: this.state.currentVehicle,
            date,
            component,
            amount,
            comments
        };

        this.props.addServices([service]);
    }
}

AddServiceDetails.contextTypes = {
    store: PropTypes.object
};

function mapStateToProps(state) {
    return {
        vehicles: state.vehicles
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({ addServices }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(AddServiceDetails);
