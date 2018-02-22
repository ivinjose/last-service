import React from "react";
import ReactDOM from "react-dom";
import queryString from "query-string";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";

import styles from "./User.css";
import globalStyles from "../../styles/global.css";
import Header from "../common/Header";
import SubHeader from "../common/SubHeader";

class User extends React.Component {
    render() {
        return (
            <div className={styles["user"]}>
                <SubHeader text={"USER"} />
                <div className={styles["body"]}>Hello there, {this.props.user.displayName}</div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        user: state.user
    };
}

export default connect(mapStateToProps)(User);
