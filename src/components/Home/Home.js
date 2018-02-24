import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { withRouter } from "react-router-dom";

import styles from "./Home.css";
import Header from "../common/Header";
import SubHeader from "../common/SubHeader";
import VehicleCard from "../common/VehicleCard";
import FloatingActionButton from "material-ui/FloatingActionButton";
import ContentAdd from "material-ui/svg-icons/content/add";
import routes from "../../routes/routes";

import { getUserVehicles, getUserServices } from "../../actions/index";

class Home extends React.Component {
    componentDidMount() {
        this.props.getUserVehicles(this.props.user._id);
        this.props.getUserServices(this.props.user._id);
    }

    render() {
        if (this.props.vehicles.length > 0) {
            return (
                <div className={styles["home"]}>
                    <SubHeader text={"HOME"} />
                    <div className={styles["body"]}>
                        {this.props.vehicles.map(function(vehicle, index) {
                            return (
                                <div className={styles["vehicle"]} key={index}>
                                    <VehicleCard data={vehicle} index={index} showEdit={false} />
                                </div>
                            );
                        })}
                    </div>
                </div>
            );
        } else {
            return (
                <div className={styles["home"]}>
                    <div className={styles["body"]}>
                        <Empty />
                        <div className={styles["cta"]}>
                            <FloatingActionButton onClick={() => this.props.history.push(routes[4].path)}>
                                <ContentAdd />
                            </FloatingActionButton>
                        </div>
                    </div>
                </div>
            );
        }
    }
}

class Empty extends React.Component {
    constructor() {
        super();
    }

    render() {
        return (
            <div className={styles["empty"]}>
                <div className={styles["text1"]}>Uh oh!</div>
                <div className={styles["text2"]}>It looks all empty in here.</div>
                <div className={styles["text3"]}>Why don't you add some?</div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        user: state.user,
        vehicles: state.vehicles
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({ getUserVehicles, getUserServices }, dispatch);
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Home));
