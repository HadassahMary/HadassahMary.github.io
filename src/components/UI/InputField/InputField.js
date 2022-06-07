import React from "react";
import classes from "./InputField.module.css";

const InputField = (props) => {
  return (
    <div className={classes.input}>
      <label htmlFor={props.input.id}>{props.label}</label>
      <input {...props.input} ref={props.passref}/>
    </div>
  );
};
export default InputField;
