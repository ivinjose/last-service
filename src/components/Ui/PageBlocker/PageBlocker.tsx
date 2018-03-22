import React from "react";
import styles from "./PageBlocker.css";

interface Props {
    children: JSX.Element; //TODO:: Is this correct?
}

class PageBlocker extends React.Component<Props, {}> {
    render() {
        return <div className={styles.pageBlocker}>{this.props.children}</div>;
    }
}

export default PageBlocker;
