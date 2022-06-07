import React, { useContext } from "react";
import classes from "./MealItem.module.css";
import Card from "../UI/Card/Card";
import MealItemForm from "./MealItemForm";
import CartContext from "../../context/cart-context";

const MealItem = (props) => {
  const itemMeal = props.item;
  const cartCtx = useContext(CartContext);
  const handleAddToCart = (amount) => {
    cartCtx.addItem({
      id: itemMeal.id,
      name: itemMeal.name,
      price: itemMeal.price,
      amount: amount
    });
  }
  return (
    <Card>
      <div className={classes.outline}>
        <div className={classes.meal}>
          <h3>{itemMeal.name}</h3>
          <div className={classes.description}>{itemMeal.description}</div>
          <div className={classes.price}>${itemMeal.price}</div>
        </div>
        <div className={classes.form}>
          <MealItemForm id={props.id} mealValue={itemMeal} onAddToCart={handleAddToCart}/>
        </div>
      </div>
    </Card>
  );
};
export default MealItem;
