import React from "react";
import ReactDOM from "react-dom";
import queryString from "query-string";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import { getUser } from "../../actions/index";

import styles from "./User.css";
import globalStyles from "../../styles/global.css";
import Header from "../common/Header";
import SubHeader from "../common/SubHeader";

class User extends React.Component {
    componentDidMount() {
        let queryParams = queryString.parse(this.props.location.search);
        if (queryParams && queryParams.uid) {
            this.props.getUser(queryParams.uid);
        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.user && nextProps.user.displayName) {
            this.props.history.push("/");
        }
    }

    render() {
        return null;
    }
}

function mapStateToProps(state) {
    return {
        user: state.user
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({ getUser }, dispatch);
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(User));
