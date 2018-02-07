import React from 'react';

import styles from './PageBlocker.css';

const PageBlocker = React.createClass({
    render(){
        return(
            <div className={styles['page-blocker']}>
                {this.props.children}
            </div>
        );
    }
})

export default PageBlocker;
