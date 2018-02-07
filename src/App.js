import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as actionCreators from './actions/actionCreator';
import Main from './components/Main';

function mapStateToProps( state ){
    return{
        vehicles: state.vehicles,
        services: state.services,
        ui: state.ui
    };
}

function mapDispatchToProps( dispatch ){
    return bindActionCreators( actionCreators, dispatch );
}

const App = connect( mapStateToProps, mapDispatchToProps )(Main);

export default App;