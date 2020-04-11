import React from "react";
import clsx from "clsx";

import Styles from "./Input.css";

const Input = (props) => {
    const inputWrapperStyle = clsx( Styles['input-wrapper'], props.styles? props.styles.inputWrapper : null );
    const inputStyle = clsx( Styles['input'], props.styles? props.styles.input : null );

    return(
        <div className={inputWrapperStyle}>
            <input className={inputStyle} {...props} />
        </div>
    )
}

export default Input;