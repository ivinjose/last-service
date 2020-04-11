import React from 'react';

export default ({vertical=0, horizontal=0}) => {
    return(
        <div style={{height: vertical+'px', width: horizontal+'px'}}></div>
    );
};