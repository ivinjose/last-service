import React from "react";
import styles from "./ServiceDetails.css";
import ServiceDetailsCard from "./ServiceDetailCard";
import types from "../../types";

interface Props {
    data: types.Service[];
}

class ServiceDetails extends React.Component<Props, {}> {
    render() {
        if (this.props.data.length === 0) {
            return (
                <div className={styles.serviceDetails}>
                    <div className={styles.noData}>
                        <h4>Looks like you have not added any service yet.</h4>
                        <h4>Why don't you add some?</h4>
                    </div>
                </div>
            );
        }

        return (
            <div className={styles.serviceDetails}>
                {this.props.data.map((service: types.Service, index: number) => {
                    return <ServiceDetailsCard key={index} service={service} />;
                })}
            </div>
        );
    }
}

export default ServiceDetails;
