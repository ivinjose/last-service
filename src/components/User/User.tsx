import React from "react";
import ReactDOM from "react-dom";
import { Dispatch } from "redux";
import queryString from "query-string";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { withRouter, RouteComponentProps } from "react-router-dom";
import { getUser } from "../../actions/index";
import styles from "./User.css";
import globalStyles from "../../styles/global.css";
import Header from "../common/Header";
import SubHeader from "../common/SubHeader";
import types from "../../types";

interface Props extends RouteComponentProps<any> {
    user: types.User;
    getUser(uid: string): void;
}

class User extends React.Component<Props, {}> {
    componentDidMount() {
        let queryParams = queryString.parse(this.props.location.search);
        if (queryParams && queryParams.uid) {
            this.props.getUser(queryParams.uid);
        }
    }

    componentWillReceiveProps(nextProps: Props) {
        if (nextProps.user && nextProps.user.displayName) {
            this.props.history.push("/");
        }
    }

    render() {
        return null;
    }
}

function mapStateToProps(state: types.AppState) {
    return {
        user: state.user
    };
}

function mapDispatchToProps(dispatch: Dispatch<types.AppState>) {
    return bindActionCreators({ getUser }, dispatch);
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(User));
