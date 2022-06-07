import React, { useContext } from "react";
import classes from "./Cart.module.css";
import Modal from "../UI/Modal/Modal";
import CartContext from "../../context/cart-context";
import CartItem from "./CartItem";
import AuthContext from "../../context/auth-context";

const Cart = (props) => {
  const AuthCtx = useContext(AuthContext);
  
  const CartCtx = useContext(CartContext);
  const removeItemFromCart = (id) => {
    CartCtx.removeItem(id);
  };
  const addItemCart = (item) => {
    CartCtx.addItem({...item, amount: 1});
  };
  const cartItems = CartCtx.items.map((item) => (
    <CartItem
      items={item}
      key={Math.random()}
      onRemove={removeItemFromCart.bind(null, item.id)}
      onAdd={addItemCart.bind(null, item)}
    />
  ));
  const hasItems = CartCtx.items.length > 0;
  const successfulOrder = hasItems && AuthCtx.isLoggedIn;
  const handleOrder = () => {
    props.onHideCart();
    CartCtx.items.splice(0);
    CartCtx.totalAmount = 0;
    alert('Order Successfully Placed!');
  }
  const handleLogin = () =>{
    alert("Please Login to Place Order!")
    AuthCtx.loginFormVisibile();
  }
  return (
    <Modal onHideCart={props.onHideCart}>
      <ul className={classes["cart-items"]}>{cartItems}</ul>
      <div className={classes.total}>
        <span>Total Amount</span>
        <span>$ {CartCtx.totalAmount.toFixed(2)}</span>
      </div>
      <div className={classes.actions}>
        <button className={classes["button--alt"]} onClick={props.onHideCart}>
          Close
        </button>
        {hasItems && <button className={classes.button} onClick={!successfulOrder ? handleLogin : handleOrder}>Order</button>}
      </div>
    </Modal>
  );
};
export default Cart;
