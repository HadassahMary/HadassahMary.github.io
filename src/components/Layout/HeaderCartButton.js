import React, { useContext, useEffect, useState } from "react";
import classes from './HeaderCartButton.module.css';
import CartIcon from "./CartIcon";
import CartContext from "../../context/cart-context";

const HeaderCartButton = props => {
    const cartCtx = useContext(CartContext);
    const [isButtonBump, setButtonBump] = useState(false);

    let buttonClass  = `${classes.button} ${isButtonBump ? classes.bump : ''}`;
    
    useEffect(() => {
        if(cartCtx.items.length === 0){
            return;
        }
        setButtonBump(true);

        const interval = setTimeout(() => {
            setButtonBump(false);
        }, 300);
        return(() => {
            clearTimeout(interval);
        })
    }, [cartCtx.items])

    return(
        <button className={buttonClass} onClick={props.onClick}>
            <span className={classes.icon}><CartIcon /></span>
            <span>Cart</span>
            <span className={classes.badge}>{cartCtx.items.reduce((curNumber, item) => {return curNumber + item.amount;}, 0)}</span>
        </button>
    );
}
export default HeaderCartButton;