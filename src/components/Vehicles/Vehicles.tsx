import React from "react";
import ReactDOM from "react-dom";
import PropTypes from "prop-types";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";

import styles from "./Vehicles.css";
import globalStyles from "../../styles/global.css";
import ServiceDetails from "../ServiceDetails";
import Header from "../common/Header";
import SubHeader from "../common/SubHeader";
import VehicleCard from "../common/VehicleCard";
import { List } from "material-ui/List";
import types from "../../types";

interface Props {
    vehicles: types.Vehicle[];
}

class Vehicles extends React.Component<Props, {}> {
    render() {
        console.log(this.props);
        if (this.props.vehicles.length == 0) {
            return (
                <div className={styles.vehicles}>
                    <SubHeader text={"MY VEHICLES"} />
                    <div className={styles.body}>
                        <div className={styles.noData}>
                            <h4>Looks like you have not added any vehicle yet.</h4>
                            <h4>Why don't you add some?</h4>
                        </div>
                    </div>
                </div>
            );
        }

        return (
            <div className={styles.vehicles}>
                <SubHeader text={"MY VEHICLES"} />
                <div className={styles.body}>
                    <List>
                        {this.props.vehicles.map(function(vehicle: types.Vehicle, index: number) {
                            return <VehicleCard key={index} data={vehicle} index={index} showEdit={true} />;
                        })}
                    </List>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state: types.AppState) {
    return {
        vehicles: state.vehicles
    };
}

export default connect(mapStateToProps)(Vehicles);
