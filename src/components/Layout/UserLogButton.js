import React from "react";
import classes from './UserLogButton.module.css';

const UserLogButton = (props) => {
    return(
        <button className={classes.button} onClick={props.onClick}>
            
            <span>{props.name}</span>
            
        </button>
    );

}
export default UserLogButton;