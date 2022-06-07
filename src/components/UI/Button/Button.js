import React from "react";
import classes from './Button.module.css';
const Button = (props) => {
    return(
        <button
        type={props.type || 'submit'}
        disabled={props.disabled}
        className={classes.button}> Submit</button>
    );
}
export default Button;