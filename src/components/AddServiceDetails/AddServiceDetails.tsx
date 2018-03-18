import React from "react";
import ReactDOM from "react-dom";
import { bindActionCreators, Dispatch } from "redux";
import { RouteComponentProps } from "react-router-dom";
import { connect } from "react-redux";
import { store } from "../../store";
import { addServices } from "../../actions/index";
import Header from "../common/Header";
import SubHeader from "../common/SubHeader";
import styles from "./AddServiceDetails.css";
import globalStyles from "../../styles/global.css";
import SelectField from "material-ui/SelectField";
import MenuItem from "material-ui/MenuItem";
import DatePicker from "material-ui/DatePicker";
import AutoComplete from "material-ui/AutoComplete";
import TextField from "material-ui/TextField";
import RaisedButton from "material-ui/RaisedButton";
import types from "../../types";

const DateTimeFormat = Intl.DateTimeFormat; //IntlPolyfill.DateTimeFormat;
const serviceableParts = ["Engine oil", "Break fluid", "Air filter", "Break disc", "Front wiper blade", "Read wiper blade"];

interface Props extends RouteComponentProps<any> {
    vehicles: types.Vehicle[];
    addServices(service: types.Service[]): void;
}

interface State {
    currentVehicle: string;
    userErrorMessage: string;
    vehicleErrorMessage: string;
    dateErrorMessage: string;
    componentErrorMessage: string;
    amountErrorMessage: string;
    date: string;
    component: string;
    amount: string;
    comments: string;
}

class AddServiceDetails extends React.Component<Props, State> {
    constructor() {
        super();

        this.state = {
            currentVehicle: "",
            userErrorMessage: "",
            vehicleErrorMessage: "",
            dateErrorMessage: "",
            componentErrorMessage: "",
            amountErrorMessage: "",
            date: "",
            component: "",
            amount: "",
            comments: ""
        };
    }

    render() {
        console.log("props", this.props);
        return (
            <div className={styles.serviceDetails}>
                <SubHeader text={"ADD NEW SERVICE"} />
                <div className={styles.body}>
                    <div className={globalStyles.row}>
                        <SelectField
                            hintText="Choose your vehicle"
                            fullWidth={true}
                            value={this.state.currentVehicle}
                            errorText={this.state.vehicleErrorMessage}
                            onChange={this.updateVehicle.bind(this)}
                        >
                            {this.props.vehicles.map(function(vehicle: types.Vehicle, index: number) {
                                return <MenuItem key={vehicle._id} value={vehicle._id} primaryText={vehicle.name} />;
                            })}
                        </SelectField>
                    </div>

                    <div className={globalStyles.row}>
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

                    <div className={globalStyles.row}>
                        <AutoComplete
                            hintText="Which part was serviced?"
                            dataSource={serviceableParts}
                            fullWidth={true}
                            errorText={this.state.componentErrorMessage}
                            filter={AutoComplete.caseInsensitiveFilter}
                            onUpdateInput={this.updateServicedComponent.bind(this)}
                        />
                    </div>

                    <div className={globalStyles.row}>
                        <TextField
                            hintText="How much you paid?"
                            fullWidth={true}
                            errorText={this.state.amountErrorMessage}
                            onChange={this.updateAmount.bind(this)}
                        />
                    </div>

                    <div className={globalStyles.row}>
                        <TextField hintText="Any comments? (Optional)" fullWidth={true} onChange={this.updateComments.bind(this)} />
                    </div>

                    <div className={globalStyles.row}>
                        <RaisedButton label="Save" primary={true} fullWidth={true} onClick={this.saveServicedItem.bind(this)} />
                    </div>
                </div>
            </div>
        );
    }

    updateVehicle(event: React.FormEvent<HTMLSelectElement>, key: number, payload: string) {
        this.setState({
            currentVehicle: payload,
            vehicleErrorMessage: ""
        });
    }

    updateDate(event: React.FormEvent<HTMLSelectElement>, date: string) {
        this.setState({
            date: date,
            dateErrorMessage: ""
        });
    }

    updateServicedComponent(searchText: string) {
        this.setState({
            component: searchText,
            componentErrorMessage: ""
        });
    }

    updateAmount(event: React.FormEvent<HTMLSelectElement>, newValue: string) {
        this.setState({
            amount: newValue,
            amountErrorMessage: ""
        });
    }

    updateComments(event: React.FormEvent<HTMLSelectElement>, newValue: string) {
        this.setState({
            comments: newValue
        });
    }

    saveServicedItem(e: React.FormEvent<HTMLSelectElement>) {
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

function mapStateToProps(state: types.AppState) {
    return {
        vehicles: state.vehicles
    };
}

function mapDispatchToProps(dispatch: Dispatch<types.AppState>) {
    return bindActionCreators({ addServices }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(AddServiceDetails);
