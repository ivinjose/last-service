declare function require(name: string): any;

import React from "react";
import { withRouter, RouteComponentProps } from "react-router-dom";
import styles from "./VehicleCard.css";

import IconButton from "material-ui/IconButton";
import MoreVertIcon from "material-ui/svg-icons/navigation/more-vert";
import IconMenu from "material-ui/IconMenu";
import MenuItem from "material-ui/MenuItem";
const iconBike = require("../../../images/bike.jpg");
const iconCar = require("../../../images/car.jpg");
import types from "../../../types";

const iconButtonElement = (
    <IconButton touch={true}>
        <MoreVertIcon color={"#bbb"} />
    </IconButton>
);

interface Props extends RouteComponentProps<any> {
    data: types.Vehicle;
    showEdit: boolean;
    index: number;
}

class VehicleCard extends React.Component<Props, {}> {
    render() {
        let iconImage = this.props.data.type == "Four wheeler" ? iconCar : iconBike;
        return (
            <li className={styles["vehicle"]} onClick={!this.props.showEdit ? this.gotoVehicleDetails.bind(this) : null}>
                <div className={styles["content"]}>
                    <div className={styles["text"]}>{this.props.data.name}</div>
                    <div className={styles["avatar"]}>
                        <img className={styles["image"]} src={`/${iconImage}`} />
                    </div>
                </div>
                {this.props.showEdit && (
                    <div className={styles["icon"]}>
                        <IconMenu iconButtonElement={iconButtonElement}>
                            <MenuItem onClick={this.gotoEditVehiclePage.bind(this)}>Edit</MenuItem>
                        </IconMenu>
                    </div>
                )}
            </li>
        );
    }

    gotoVehicleDetails() {
        this.props.history.push("/services?vehicle=" + this.props.data._id);
    }

    gotoEditVehiclePage() {
        this.props.history.push("/addvehicle?editMode=true&id=" + this.props.data._id);
    }
}

export default withRouter(VehicleCard);
