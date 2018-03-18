import React from "react";
import { Dispatch } from "redux";
import { History } from "history";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { withRouter, RouteComponentProps } from "react-router-dom";
import styles from "./Home.css";
import Header from "../common/Header";
import SubHeader from "../common/SubHeader";
import VehicleCard from "../common/VehicleCard";
import VehicleCardLoading from "../common/VehicleCard/VehicleCardLoading";
import FloatingActionButton from "material-ui/FloatingActionButton";
import ContentAdd from "material-ui/svg-icons/content/add";
import routes from "../../routes/routes";
import { getUserVehicles, getUserServices } from "../../actions/index";
import types from "../../types";

interface Props extends RouteComponentProps<any> {
    getUserVehicles(id: string): void;
    getUserServices(id: string): void;
    user: types.User;
    vehicles: types.Vehicle[];
    ui: {
        showPageBlockingLoader: boolean;
        showPlaceholderLoader: boolean;
        snackbarMessage: string;
    };
}

class Home extends React.Component<Props, {}> {
    componentDidMount() {
        this.props.getUserVehicles(this.props.user._id);
        this.props.getUserServices(this.props.user._id);
    }

    render() {
        if (this.props.ui.showPlaceholderLoader) {
            return <LoadingProps />;
        } else {
            if (this.props.vehicles.length > 0) {
                return <LoadedProps vehicles={this.props.vehicles} />;
            } else {
                return <EmptyProps history={this.props.history} />;
            }
        }
    }
}

const LoadingProps = () => (
    <div className={styles.home}>
        <SubHeader text={"HOME"} />
        <div className={styles.body}>
            <VehicleCardLoading />
            <VehicleCardLoading />
        </div>
    </div>
);

const LoadedProps: React.SFC<{ vehicles: types.Vehicle[] }> = (props) => (
    <div className={styles.home}>
        <SubHeader text={"HOME"} />
        <div className={styles.body}>
            {props.vehicles.map(function(vehicle: types.Vehicle, index: number) {
                return (
                    <div key={index}>
                        <VehicleCard data={vehicle} index={index} showEdit={false} />
                    </div>
                );
            })}
        </div>
    </div>
);

interface EmptyPropsProps {
    history: History;
}
const EmptyProps: React.SFC<EmptyPropsProps> = (props) => (
    <div className={styles.home}>
        <div className={styles.body}>
            <div className={styles.empty}>
                <div className={styles.text1}>Uh oh!</div>
                <div className={styles.text2}>It looks all empty in here.</div>
                <div className={styles.text3}>Why don't you add some?</div>
            </div>
            <div className={styles.cta}>
                <FloatingActionButton onClick={() => props.history.push(routes[4].path)}>
                    <ContentAdd />
                </FloatingActionButton>
            </div>
        </div>
    </div>
);

function mapStateToProps(state: types.AppState) {
    return {
        ui: state.ui,
        user: state.user,
        vehicles: state.vehicles
    };
}

function mapDispatchToProps(dispatch: Dispatch<types.AppState>) {
    return bindActionCreators({ getUserVehicles, getUserServices }, dispatch);
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Home));
