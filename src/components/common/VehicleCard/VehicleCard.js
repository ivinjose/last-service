import React from "react";
import { withRouter } from "react-router-dom";
import styles from "./VehicleCard.css";

import IconButton from "material-ui/IconButton";
import MoreVertIcon from "material-ui/svg-icons/navigation/more-vert";
import IconMenu from "material-ui/IconMenu";
import MenuItem from "material-ui/MenuItem";

import iconBike from "../../../images/bike.jpg";
import iconCar from "../../../images/car.jpg";

const iconButtonElement = (
    <IconButton touch={true}>
        <MoreVertIcon color={"#bbb"} />
    </IconButton>
);

class VehicleCard extends React.Component {
    render() {
        let iconImage = this.props.data.type == "Four wheeler" ? iconCar : iconBike;
        return (
            <li
                className={styles["vehicle"]}
                onClick={!this.props.showEdit ? this.gotoVehicleDetails.bind(this) : null}
            >
                <div className={styles["content"]}>
                    <div className={styles["text"]}>{this.props.data.name}</div>
                    <div className={styles["avatar"]}>
                        <img className={styles["image"]} src={`/images/${iconImage}`} />
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
