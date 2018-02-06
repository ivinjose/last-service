import React from 'react';
import { Link } from 'react-router';

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
                {React.cloneElement( this.props.children, this.props )}
            </div>
        );
    }
})

export default Main;