import React from "react";
import styles from "./ServiceDetailCard.css";
import types from "../../../types";

interface IProps {
    service: types.Service;
}

class ServiceDetailCard extends React.Component<IProps, {}> {
    formatDateTime(date: string) {
        const newDate = new Date(date);
        return {
            date: newDate.toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" }),
            time: newDate.toLocaleTimeString()
        };
    }

    render() {
        const dateTime = this.formatDateTime(this.props.service.date);
        return (
            <div className={styles.serviceDetailCard}>
                <div className={styles.leftCol}>
                    <div className={styles.amount}>
                        <span className={styles.symbol}>&#8377;</span>
                        <span className={styles.figure}>{this.props.service.amount}</span>
                    </div>

                    <div className={styles.date}>{dateTime.date}</div>
                </div>
                <div className={styles.rightCol}>
                    <div className={styles.component}>{this.props.service.component}</div>
                    <div className={styles.kms}>{this.props.service.kmsReading}</div>
                    <div className={styles.comments}>{this.props.service.comments}</div>
                </div>
            </div>
        );
    }
}

export default ServiceDetailCard;
