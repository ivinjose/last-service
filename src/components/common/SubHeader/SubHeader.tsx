import React from "react";
import styles from "./SubHeader.css";

class SubHeader extends React.Component<{ text: string }, {}> {
    render() {
        return <h1 className={styles.subHeader}>{this.props.text}</h1>;
    }
}

export default SubHeader;
