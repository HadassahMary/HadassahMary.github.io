import React, { useContext, useRef, useState } from "react";
import classes from "./MealItemForm.module.css";
import InputField from "../UI/InputField/InputField";
import CartContext from "../../context/cart-context";

const MealItemForm = (props) => {
    const amountref = useRef();
    const [isFromValid, setFormValidity] = useState(true);
    const CartCtx = useContext(CartContext);
    const submitHandler = (event) =>{
        event.preventDefault();
        const enteredAmt = amountref.current.value;
        const numAmount = +enteredAmt;
        if(enteredAmt.length === 0 || numAmount < 1 || numAmount > 5){
          setFormValidity(false);
          return;
        }
        else{
          setFormValidity(true);
          props.onAddToCart(numAmount);
        }

    }
  return (
    <form className={classes.form} onSubmit={submitHandler} noValidate>
      <InputField
        label="Amount"
        passref = {amountref}
        input={{
          type: "number",
          id: 'amount_'+ props.id,
          min: "1",
          max: "5",
          step: '1',
          defaultValue: '1'
        }} />
      <button>+Add</button>
      {!isFromValid && <p>Please enter value from (1-5)</p>}
    </form>
  );
};
export default MealItemForm;
