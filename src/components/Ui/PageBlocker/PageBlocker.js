import React from 'react';

import styles from './PageBlocker.css';

class PageBlocker extends React.Component{
    render(){
        return(
            <div className={styles['page-blocker']}>
                {this.props.children}
            </div>
        );
    }
}

export default PageBlocker;
