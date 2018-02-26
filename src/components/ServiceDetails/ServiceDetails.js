import React from "react";
import styles from "./ServiceDetails.css";
import { Card, CardHeader, CardText } from "material-ui/Card";
import svg from "../../images/notfound.svg";
import ServiceDetailsCard from "./ServiceDetailCard";

class ServiceDetails extends React.Component {
    constructor(props) {
        super();
        this.formatDateTime = this.formatDateTime.bind(this);
    }

    formatDateTime(date) {
        const newDate = new Date(date);
        return {
            date: newDate.toLocaleDateString(),
            time: newDate.toLocaleTimeString()
        };
    }

    render() {
        if (this.props.data.length === 0) {
            return (
                <div className={styles["service-details"]}>
                    <div className={styles["no-data"]}>
                        <div className={styles["Header"]}>
                            <h4>Looks like you have not added any services yet.</h4>
                            <h4>Why don't you add some?</h4>
                        </div>
                        <div className={styles["avatar"]}>{/* <img src={`/images/${svg}`} /> */}</div>
                    </div>
                </div>
            );
        }

        return (
            <div ref="serviceItem" className={styles["service-details"]}>
                {this.props.data.map((service, index) => {
                    return <ServiceDetailsCard key={index} service={service} />;
                })}
            </div>
        );
    }
}

export default ServiceDetails;
