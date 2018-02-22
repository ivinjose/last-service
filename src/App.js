import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import * as actionCreators from "./actions/index";
import Main from "./components/Main";

function mapStateToProps(state) {
    return {
        user: state.user,
        vehicles: state.vehicles,
        services: state.services,
        ui: state.ui
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(actionCreators, dispatch);
}

/**
 * Wrapping connect with withRouter to let the shouldComponentUpdate know abut the location change
 * Ref: https://github.com/ReactTraining/react-router/blob/master/packages/react-router/docs/guides/blocked-updates.md
 */
const App = withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));

export default App;
