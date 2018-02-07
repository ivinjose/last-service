import React from 'react';
import { Link } from 'react-router';
import PageBlocker from './Ui/PageBlocker'
import RefreshIndicator from 'material-ui/RefreshIndicator';

import Header from './common/Header';

const Main = React.createClass({
    render(){
        return(
            <div>
                <h1>
                    <Link to="/">
                        <Header title={"Service Manager"}/>
                    </Link>
                </h1>
                {this.props.ui.blockUi &&
                    <PageBlocker>
                        <RefreshIndicator
                            size={50}
                            left={0}
                            top={0}
                            loadingColor="#FF9800"
                            status="loading"
                            style={{position: 'relative'}}
                        />
                    </PageBlocker>
                }                
                {React.cloneElement( this.props.children, this.props )}
            </div>
        );
    }
})

export default Main;