import React from "react";
const LoginInputField = (props) => {
    return(
        <React.Fragment>
            <label>{props.label}</label>
            <input type={props.type} 
            onChange={props.onChange}
            onBlur={props.onBlur}
            value={props.value}
            ref={props.passref}></input>
        </React.Fragment>
    );
};
export default LoginInputField;