import React from "react";
import styles from "./ServiceDetails.css";
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
                        <h4>Looks like you have not added any service yet.</h4>
                        <h4>Why don't you add some?</h4>
                        <div className={styles["avatar"]}>{/* <img src={`/images/${svg}`} /> */}</div>
                    </div>
                </div>
            );
        }

        return (
            <div className={styles["service-details"]}>
                {this.props.data.map((service, index) => {
                    return <ServiceDetailsCard key={index} service={service} />;
                })}
            </div>
        );
    }
}

export default ServiceDetails;
