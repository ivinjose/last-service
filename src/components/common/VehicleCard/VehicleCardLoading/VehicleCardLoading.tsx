import React from "react";
import styles from "./VehicleCardLoading.css";
import cx from "classnames";

const VehicleCardLoading = () => (
    <li className={styles.vehicle}>
        <div className={styles.content}>
            <div className={cx(styles.text, styles.animated)} />
            <div className={cx(styles.avatar, styles.animated)} />
        </div>
    </li>
);

export default VehicleCardLoading;
